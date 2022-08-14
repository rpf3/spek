import type { DataRow } from '$lib/types';
import type { Writable } from 'svelte/store';

import { writable } from 'svelte/store';
import { createDataRows } from '$lib/utils';
import { getRowValue } from '$lib/utils';
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
	const { subscribe, update, set: _set } = store;

	function sort(key: string, direction: SortDirection) {
		update((rows) => sortRows(rows, key, direction));
	}

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	function set(data: any[]) {
		const rows = createDataRows(data);

		_set(rows);
	}

	return {
		subscribe,
		set,
		sort
	};
}

export const rows = create();
