import type { DataItem } from '$lib/types';
import type { DataRow } from '$lib/types';

function sanitizeValue(value: unknown): string {
	if (typeof value === 'string') {
		return value;
	}

	return JSON.stringify(value);
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function createDataItems(data: any): DataItem[] {
	const keys = Object.keys(data);

	const items = keys.map((key) => {
		const value = sanitizeValue(data[key]);

		const item: DataItem = {
			key: key,
			value: value
		};

		return item;
	});

	return items;
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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

function getRowValue(row: DataRow, key: string): string | null {
	const dataItem = row.items.find((item) => item.key === key);

	if (dataItem === undefined) {
		return null;
	}

	return dataItem.value;
}

export { createDataRows, getRowValue };
