export type Column = {
	key: string;
	header: string;
	filterable?: boolean;
};

export type DataItem = {
	key: string;
	value: string;
};

export type DataRow = {
	items: DataItem[];
};

export type DataSet = {
	rows: DataRow[];
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
