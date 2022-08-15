import type { DataRow } from '$lib/types';
import type { Writable } from 'svelte/store';

import { writable } from 'svelte/store';
import { getRowValue } from '$lib/utils';
import { createDataRows } from '$lib/utils/data';
import { SortDirection } from '$lib/types';

function rowComparator(row1: DataRow, row2: DataRow, key: string): number {
	const value1 = getRowValue(row1, key) || '';
	const value2 = getRowValue(row2, key) || '';

	return value1.localeCompare(value2);
}

function sortRows(rows: DataRow[], key: string, direction: SortDirection): DataRow[] {
	rows.sort((row1: DataRow, row2: DataRow) => {
		if (direction === SortDirection.Ascending) {
			return rowComparator(row1, row2, key);
		}

		return rowComparator(row2, row1, key);
	});

	return rows;
}

function create() {
	const store: Writable<DataRow[]> = writable();
	const { subscribe, update, set: set } = store;

	function sort(key: string, direction: SortDirection) {
		update((rows) => sortRows(rows, key, direction));
	}

	function filter(key: string, value: string) {
		console.log(`filtering ${key} for ${value}`);
	}

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	function init(data: any[]) {
		const rows = createDataRows(data);

		set(rows);
	}

	return {
		subscribe,
		init,
		sort,
		filter
	};
}

export const rows = create();
