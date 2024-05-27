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

export type ComboboxChangePayload = {
	value: ComboboxValue;
};

export type ComboboxChangeEvent = CustomEvent<ComboboxChangePayload>;

export type ComboboxSearchPayload = {
	text: string;
};

export type ComboboxSearchEvent = CustomEvent<ComboboxSearchPayload>;
