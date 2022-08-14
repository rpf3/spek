export type Column = {
	key: string;
	header: string;
};

export type DataItem = {
	key: string;
	value: string | number;
};

export type DataRow = {
	items: DataItem[];
};
