import { ComponentOptions, defineComponent, h } from 'vue'
import { Components } from '@baklavajs/renderer-vue'
import { AbstractNode } from '@baklavajs/core'
// @ts-ignore
import StartNodeRenderer from '~/components/ChatBotsNodes/StartNodeRenderer.vue'
// @ts-ignore
import ActionNodeRenderer from '~/components/ChatBotsNodes/ActionNodeRenderer.vue'
// @ts-ignore
import IdleNodeRenderer from '~/components/ChatBotsNodes/IdleNodeRenderer.vue'
// @ts-ignore
import IfNodeRenderer from '~/components/ChatBotsNodes/IfNodeRenderer.vue'
// @ts-ignore
import MessageNodeRenderer from '~/components/ChatBotsNodes/MessageNodeRenderer.vue'
// @ts-ignore
import InputNodeRenderer from '~/components/ChatBotsNodes/InputNodeRenderer.vue'
// @ts-ignore
import RedirectNodeRenderer from '~/components/ChatBotsNodes/RedirectNodeRenderer.vue'
// @ts-ignore
import TemplateWabaNodeRenderer from '~/components/ChatBotsNodes/TemplateWabaNodeRenderer.vue'

const NODE_TYPES = new Map()
NODE_TYPES.set('StartNode', StartNodeRenderer)
NODE_TYPES.set('ActionNode', ActionNodeRenderer)
NODE_TYPES.set('IdleNode', IdleNodeRenderer)
NODE_TYPES.set('IfNode', IfNodeRenderer)
NODE_TYPES.set('MessageNode', MessageNodeRenderer)
NODE_TYPES.set('InputNode', InputNodeRenderer)
NODE_TYPES.set('RedirectNode', RedirectNodeRenderer)
NODE_TYPES.set('TemplateWabaNode', TemplateWabaNodeRenderer)

export default defineComponent({
	props: {
		node: {
			type: Object as () => AbstractNode,
			required: true,
		},
	},
	render() {
		const getComponent = (): ComponentOptions => {
			const node = this.node
			return NODE_TYPES.has(node.type)
				? NODE_TYPES.get(node.type)
				: (Components.Node as ComponentOptions)
		}

		return h(getComponent(), { ...this.$props, ...this.$attrs })
	},
})
