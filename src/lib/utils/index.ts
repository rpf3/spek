import type { DataItem } from '$lib/types';
import type { DataRow } from '$lib/types';

function createDataItems(data: any): DataItem[] {
	const keys = Object.keys(data);

	const items = keys.map((key) => {
		const item: DataItem = {
			key: key,
			value: data[key]
		};

		return item;
	});

	return items;
}

function createDataRows(data: any[]): DataRow[] {
	const rows = data.map((item) => {
		const items = createDataItems(item);

		const row: DataRow = {
			items: items
		};

		return row;
	});

	return rows;
}

export { createDataRows };
