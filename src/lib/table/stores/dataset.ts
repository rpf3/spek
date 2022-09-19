import type { DataItem } from '$lib/table/types';
import type { DataRow } from '$lib/table/types';
import type { DataSet } from '$lib/table/types';
import type { Writable } from 'svelte/store';

import { writable } from 'svelte/store';

function sanitizeValue(value: unknown): string | number | Date {
	if (typeof value === 'string' || typeof value === 'number' || value instanceof Date) {
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

function create() {
	const store: Writable<DataSet> = writable({
		rows: [],
		total: 0
	});

	const { subscribe, set } = store;

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	function init(data: any[]) {
		const rows = createDataRows(data);

		set({
			rows: rows,
			total: rows.length
		});
	}

	return {
		subscribe,
		init
	};
}

export const dataset = create();
