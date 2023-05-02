<template>
	<ConnectionView
		:x1="d.input[0]"
		:y1="d.input[1]"
		:x2="d.output[0]"
		:y2="d.output[1]"
		:state="status"
		is-temporary
	/>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { ITemporaryConnection, TemporaryConnectionState } from './connection'
import resolveDom from './domResolver'
import { getOutputPortCoordinates, getInputPortCoordinates } from './portCoordinates'
import ConnectionView from './ConnectionView.vue'

const props = defineProps<{
	connection: ITemporaryConnection;
}>()

const status = computed(() => (props.connection ? props.connection.status : TemporaryConnectionState.NONE))

const d = computed(() => {
	if (!props.connection) {
		return {
			input: [0, 0],
			output: [0, 0],
		}
	}

	const start = getOutputPortCoordinates(resolveDom(props.connection.from))
	const end = props.connection.to
		? getInputPortCoordinates(resolveDom(props.connection.to))
		: [props.connection.mx || start[0], props.connection.my || start[1]]

	if (props.connection.from.isInput) {
		return {
			input: end,
			output: start,
		}
	} else {
		return {
			input: start,
			output: end,
		}
	}
})

const emit = defineEmits(['enabled-output-ports', 'disabled-output-ports'])

onMounted(() => {
	emit('enabled-output-ports')
})

onUnmounted(() => {
	emit('disabled-output-ports')
})
</script>
