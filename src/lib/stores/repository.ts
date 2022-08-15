import type { DataRow } from '$lib/types';
import type { DataSet } from '$lib/types';
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

function filterRows(rows: DataRow[], key: string, value: string): DataRow[] {
	const result = rows.filter((row) => {
		const dataItemValue = getRowValue(row, key) || '';

		return dataItemValue.includes(value);
	});

	return result;
}

function create() {
	const store: Writable<DataSet> = writable();
	const { subscribe, update, set: set } = store;

	function sort(key: string, direction: SortDirection) {
		update((dataset) => {
			return {
				_rows: dataset._rows,
				rows: sortRows(dataset._rows, key, direction)
			};
		});
	}

	function filter(key: string, value: string) {
		update((dataset) => {
			return {
				_rows: dataset._rows,
				rows: filterRows(dataset._rows, key, value)
			};
		});
	}

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	function init(data: any[]) {
		const rows = createDataRows(data);

		set({
			_rows: rows,
			rows: rows
		});
	}

	return {
		subscribe,
		init,
		sort,
		filter
	};
}

export const repository = create();
