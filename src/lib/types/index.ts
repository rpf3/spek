import type { ComponentType } from 'svelte';

export type Column = {
	key: string;
	header: string;
	sortable?: boolean;
	filterable?: boolean;
	slot?: ComponentType;
};

export type DataItem = {
	key: string;
	value: string | number;
};

export type DataRow = {
	items: DataItem[];
};

export type DataSet = {
	rows: DataRow[];
	total: number;
};

export enum SortDirection {
	Ascending,
	Descending,
	None
}

export type SortState = {
	key: string;
	direction: SortDirection;
};

export type FilterState = {
	key: string;
	value: string;
};

export type PageState = {
	skip: number;
	take: number;
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
