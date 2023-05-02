import { IResolvedDomElements } from './domResolver'

export function getOutputPortCoordinates(resolved: IResolvedDomElements): [number, number] {
	if (resolved.node && resolved.interface && resolved.port) {
		return [
			resolved.node.offsetLeft + resolved.interface.offsetLeft + resolved.port.offsetLeft + resolved.port.clientWidth / 2,
			resolved.node.offsetTop + resolved.interface.offsetTop + resolved.port.offsetTop + resolved.port.clientHeight / 2,
		]
	} else {
		return [0, 0]
	}
}

export const getInputPortCoordinates = (resolved: IResolvedDomElements): [number, number] => {
	if (resolved.node && resolved.interface && resolved.port) {
		return [
			resolved.node.offsetLeft +
				resolved.interface.offsetLeft,
			resolved.node.offsetTop +
				resolved.interface.offsetTop +
				26,
		]
	} else {
		return [0, 0]
	}
}
