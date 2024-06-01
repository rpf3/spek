export type SelectOption = {
	value: string;
	text: string;
};

export type ComboboxChangePayload = {
	value: SelectOption;
};

export type ComboboxChangeEvent = CustomEvent<ComboboxChangePayload>;

export type ComboboxSearchPayload = {
	text: string;
};

export type ComboboxSearchEvent = CustomEvent<ComboboxSearchPayload>;
