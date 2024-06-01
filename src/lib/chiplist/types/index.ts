import type { SelectOption } from '$lib/combobox/types';

export type ChipListChangePayload = {
	value: SelectOption[];
};

export type ChipListChangeEvent = CustomEvent<ChipListChangePayload>;
