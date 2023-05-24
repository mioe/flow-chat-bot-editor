import { type ComponentOptions, markRaw } from 'vue'
import { NodeInterface } from '@baklavajs/core'
import SelectInterfaceComponent from './SelectInterface.vue'

type Option = { text: string; value: string; [key: string]: any };

interface SelectOption {
	/** PSelect component props */
	options?: Option[];
	label?: string;
	placeholder?: string;
	error?: string | boolean;
	size?: 'large' | 'medium' | 'small';
	variant?: 'default' | 'raw';
	hint?: string;
	prefix?: string;
	multiple?: boolean;
	disabled?: boolean;
	autocomplete?: boolean;
	allowCustomValue?: boolean;
	width?: number;
	maxHeight?: number;
	maxLength?: number;
	hideEmptyMenu?: boolean;

	/** regular props */
	hintEmptySearch?: boolean;
	addEmptySearch?: boolean;
}

const DEFAULT_OPTIONS: SelectOption = {
	options: [],
	label: undefined,
	placeholder: undefined,
	error: undefined,
	size: undefined,
	variant: 'default',
	hint: undefined,
	prefix: undefined,
	multiple: false,
	disabled: false,
	autocomplete: false,
	allowCustomValue: false,
	width: undefined,
	maxHeight: undefined,
	maxLength: undefined,
	hideEmptyMenu: false,

	hintEmptySearch: false,
	addEmptySearch: false,
}

export class SelectInterface extends NodeInterface {
	public component = markRaw(SelectInterfaceComponent) as ComponentOptions
	public position = undefined
	public options = DEFAULT_OPTIONS

	public constructor({ name, value, position, options = DEFAULT_OPTIONS }: any) {
		super(name, value)
		this.position = position
		this.options = options
		this.setPort(false)
	}
}
