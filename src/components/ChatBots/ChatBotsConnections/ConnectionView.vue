<script lang="ts">
import { computed, defineComponent } from 'vue'
import { TemporaryConnectionState } from './connection'
import { useGraph } from '~/components/ChatBots/utility'

function getEdgeCenter({
	sourceX,
	sourceY,
	targetX,
	targetY,
}: {
	sourceX: number
	sourceY: number
	targetX: number
	targetY: number
}): [number, number, number, number] {
	const xOffset = Math.abs(targetX - sourceX) / 2
	const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset

	const yOffset = Math.abs(targetY - sourceY) / 2
	const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset

	return [centerX, centerY, xOffset, yOffset]
}

enum Position {
	Left = 'left',
	Top = 'top',
	Right = 'right',
	Bottom = 'bottom',
}

interface XYPosition {
	x: number
	y: number
}

interface GetSmoothStepPathParams {
	sourceX: number
	sourceY: number
	sourcePosition?: Position
	targetX: number
	targetY: number
	targetPosition?: Position
	borderRadius?: number
	centerX?: number
	centerY?: number
	offset?: number
}

export default defineComponent({
	props: {
		x1: {
			type: Number,
			required: true,
		},
		y1: {
			type: Number,
			required: true,
		},
		x2: {
			type: Number,
			required: true,
		},
		y2: {
			type: Number,
			required: true,
		},
		state: {
			type: Number as () => TemporaryConnectionState,
			default: TemporaryConnectionState.NONE,
		},
		isTemporary: {
			type: Boolean,
			default: false,
		},
		withArrow: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const { graph } = useGraph()

		const transform = (x: number, y: number) => {
			// @ts-ignore
			const tx = (x + graph.value.panning.x) * graph.value.scaling
			// @ts-ignore
			const ty = (y + graph.value.panning.y) * graph.value.scaling
			return [tx, ty]
		}

		const transformConstants = (size: number) => {
			// @ts-ignore
			return size * graph.value.scaling
		}

		const handleDirections = {
			[Position.Left]: { x: -1, y: 0 },
			[Position.Right]: { x: 1, y: 0 },
			[Position.Top]: { x: 0, y: -1 },
			[Position.Bottom]: { x: 0, y: 1 },
		}

		const source = computed(() => {
			const [x, y] = transform(props.x1, props.y1)
			return { x, y }
		})

		const target = computed(() => {
			const [x, y] = transform(props.x2, props.y2)
			return { x, y }
		})

		const getDirection = ({
			source,
			sourcePosition = Position.Bottom,
			target,
		}: {
			source: XYPosition;
			sourcePosition: Position;
			target: XYPosition;
		}): XYPosition => {
			if (sourcePosition === Position.Left || sourcePosition === Position.Right) {
				return source.x < target.x ? { x: 1, y: 0 } : { x: -1, y: 0 }
			}
			return source.y < target.y ? { x: 0, y: 1 } : { x: 0, y: -1 }
		}

		const distance = (a: XYPosition, b: XYPosition) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))

		// ith this function we try to mimic a orthogonal edge routing behaviour
		// It's not as good as a real orthogonal edge routing but it's faster and good enough as a default for step and smooth step edges
		function getPoints({
			source,
			sourcePosition = Position.Bottom,
			target,
			targetPosition = Position.Top,
			center,
			offset,
		}: {
			source: XYPosition;
			sourcePosition: Position;
			target: XYPosition;
			targetPosition: Position;
			center: Partial<XYPosition>;
			offset: number;
		}): [XYPosition[], number, number, number, number] {
			const sourceDir = handleDirections[sourcePosition]
			const targetDir = handleDirections[targetPosition]
			const offsetWithTransform = transformConstants(offset)
			const sourceGapped: XYPosition = { x: source.x + sourceDir.x * offsetWithTransform, y: source.y + sourceDir.y * offsetWithTransform }
			const targetGapped: XYPosition = { x: target.x + targetDir.x * offsetWithTransform, y: target.y + targetDir.y * offsetWithTransform }
			const dir = getDirection({
				source: sourceGapped,
				sourcePosition,
				target: targetGapped,
			})
			const dirAccessor = dir.x !== 0 ? 'x' : 'y'
			const currDir = dir[dirAccessor]

			let points: XYPosition[] = []
			let centerX, centerY
			const [defaultCenterX, defaultCenterY, defaultOffsetX, defaultOffsetY] = getEdgeCenter({
				sourceX: source.x,
				sourceY: source.y,
				targetX: target.x,
				targetY: target.y,
			})

			// opposite handle positions, default case
			if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
				centerX = center.x || defaultCenterX
				centerY = center.y || defaultCenterY
				//    --->
				//    |
				// >---
				const verticalSplit: XYPosition[] = [
					{ x: centerX, y: sourceGapped.y },
					{ x: centerX, y: targetGapped.y },
				]
				//    |
				//  ---
				//  |
				const horizontalSplit: XYPosition[] = [
					{ x: sourceGapped.x, y: centerY },
					{ x: targetGapped.x, y: centerY },
				]

				if (sourceDir[dirAccessor] === currDir) {
					points = dirAccessor === 'x' ? verticalSplit : horizontalSplit
				} else {
					points = dirAccessor === 'x' ? horizontalSplit : verticalSplit
				}
			} else {
				// sourceTarget means we take x from source and y from target, targetSource is the opposite
				const sourceTarget: XYPosition[] = [{ x: sourceGapped.x, y: targetGapped.y }]
				const targetSource: XYPosition[] = [{ x: targetGapped.x, y: sourceGapped.y }]
				// this handles edges with same handle positions
				if (dirAccessor === 'x') {
					points = sourceDir.x === currDir ? targetSource : sourceTarget
				} else {
					points = sourceDir.y === currDir ? sourceTarget : targetSource
				}

				// these are conditions for handling mixed handle positions like Right -> Bottom for example
				if (sourcePosition !== targetPosition) {
					const dirAccessorOpposite = dirAccessor === 'x' ? 'y' : 'x'
					const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite]
					const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite]
					const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite]
					const flipSourceTarget =
        (sourceDir[dirAccessor] === 1 && ((!isSameDir && sourceGtTargetOppo) || (isSameDir && sourceLtTargetOppo))) ||
        (sourceDir[dirAccessor] !== 1 && ((!isSameDir && sourceLtTargetOppo) || (isSameDir && sourceGtTargetOppo)))

					if (flipSourceTarget) {
						points = dirAccessor === 'x' ? sourceTarget : targetSource
					}
				}

				centerX = points[0].x
				centerY = points[0].y
			}

			const pathPoints = [source, sourceGapped, ...points, targetGapped, target]

			return [pathPoints, centerX, centerY, defaultOffsetX, defaultOffsetY]
		}

		function getBend(a: XYPosition, b: XYPosition, c: XYPosition, size: number): string {
			const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size)
			const { x, y } = b

			// no bend
			if ((a.x === x && x === c.x) || (a.y === y && y === c.y)) {
				return `L${x} ${y}`
			}

			// first segment is horizontal
			if (a.y === y) {
				const xDir = a.x < c.x ? -1 : 1
				const yDir = a.y < c.y ? 1 : -1
				return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`
			}

			const xDir = a.x < c.x ? 1 : -1
			const yDir = a.y < c.y ? -1 : 1
			return `L ${x},${y + bendSize * yDir}Q ${x},${y} ${x + bendSize * xDir},${y}`
		}

		function getSmoothStepPath({
			sourceX,
			sourceY,
			sourcePosition = Position.Right,
			targetX,
			targetY,
			targetPosition = Position.Left,
			borderRadius = 10,
			centerX,
			centerY,
			offset = 30,
		}: GetSmoothStepPathParams): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number] {
			const [points, labelX, labelY, offsetX, offsetY] = getPoints({
				source: { x: sourceX, y: sourceY },
				sourcePosition,
				target: { x: targetX, y: targetY },
				targetPosition,
				center: { x: centerX, y: centerY },
				offset,
			})

			const path = points.reduce<string>((res, p, i) => {
				let segment = ''

				if (i > 0 && i < points.length - 1) {
					segment = getBend(points[i - 1], p, points[i + 1], transformConstants(borderRadius))
				} else {
					segment = `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`
				}

				res += segment

				return res
			}, '')

			return [path, labelX, labelY, offsetX, offsetY]
		}

		const d = computed(() => {
			const [path] = getSmoothStepPath({
				sourceX: source.value.x,
				sourceY: source.value.y,
				sourcePosition: Position.Right,
				targetX: target.value.x,
				targetY: target.value.y,
				targetPosition: Position.Left,
			})

			return path
		})

		const classes = computed(() => ({
			'--temporary': props.isTemporary,
			'--allowed': props.state === TemporaryConnectionState.ALLOWED,
			'--forbidden': props.state === TemporaryConnectionState.FORBIDDEN,
		}))

		return { d, classes }
	},
})
</script>

<template>
	<path
		:marker-end="withArrow ? 'url(#ps-connection-arrow)' : 'url(#)'"
		class="baklava-connection"
		:class="classes"
		:d="d"
	/>
</template>
