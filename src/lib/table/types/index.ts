import type { ComponentType, SvelteComponentTyped } from 'svelte';

type DataCellProps = {
	row: DataRow;
	column: Column;
};

type DataCellComponent = SvelteComponentTyped<DataCellProps, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

type HeaderCellProps = {
	column: Column;
};

type HeaderCellComponent = SvelteComponentTyped<HeaderCellProps, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type Column = {
	key: string;
	header: string;
	sortable?: boolean;
	filterable?: boolean;
	size?: number;
	slots?: {
		cell?: ComponentType<DataCellComponent>;
		header?: ComponentType<HeaderCellComponent>;
	};
};

export type DataItemValue = string | number | Date;

export type DataItem = {
	key: string;
	value: DataItemValue;
};

export type DataRow = {
	items: DataItem[];
};

export type DataSet = {
	rows: DataRow[];
	total: number;
};

type ObjectValues<T> = T[keyof T];

export const SORT_DIRECTION = {
	ASCENDING: 'Ascending',
	DESCENDING: 'Descending',
	NONE: 'None'
} as const;

export type SortDirection = ObjectValues<typeof SORT_DIRECTION>;

export type SortState = {
	key: string;
	direction: SortDirection;
};

export type FilterValue = {
	key: string;
	value: string | null;
};

export type FilterState = {
	filters: FilterValue[];
};

export type PageState = {
	skip: number;
	take: number;
	number: number;
};

export type PaginationConfig = {
	enabled: boolean;
	size: number;
};

export type Config = {
	pagination: PaginationConfig;
};

export const defaultConfig: Config = {
	pagination: {
		enabled: true,
		size: 10
	}
};
