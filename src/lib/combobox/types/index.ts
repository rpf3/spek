export type SelectOption = {
	value: string;
	text: string;
};

export type MonoComboboxValue = {
	type: 'mono';
	selection?: SelectOption | undefined;
};

export type MultiComboboxValue = {
	type: 'multi';
	selection: SelectOption[];
};

export type ComboboxValue = MonoComboboxValue | MultiComboboxValue;
