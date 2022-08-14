export type Column = {
	key: string;
	header: string;
};

export type DataItem = {
	key: string;
	value: string;
};

export type DataRow = {
	items: DataItem[];
};

export enum SortDirection {
	Ascending,
	Descending,
	None
}
