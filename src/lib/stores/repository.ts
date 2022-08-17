import type { DataSet } from '$lib/types';
import type { FilterState } from '$lib/types';
import type { SortState } from '$lib/types';
import type { DataRow } from '$lib/types';

import { derived } from 'svelte/store';
import { dataset } from './dataset';
import { filter } from './filter';
import { sort } from './sort';
import { getRowValue } from '$lib/utils';
import { SortDirection } from '$lib/types';

function rowComparator(row1: DataRow, row2: DataRow, key: string): number {
	const value1 = getRowValue(row1, key) || '';
	const value2 = getRowValue(row2, key) || '';

	return value1.localeCompare(value2);
}

function sortRows(rows: DataRow[], state: SortState): DataRow[] {
	if (state === undefined || state === null) {
		return rows;
	}

	rows.sort((row1: DataRow, row2: DataRow) => {
		if (state.direction === SortDirection.Ascending) {
			return rowComparator(row1, row2, state.key);
		}

		return rowComparator(row2, row1, state.key);
	});

	return rows;
}

function filterRows(rows: DataRow[], state: FilterState): DataRow[] {
	if (state === undefined || state === null) {
		return rows;
	}

	const result = rows.filter((row) => {
		const dataItemValue = getRowValue(row, state.key) || '';

		return dataItemValue.includes(state.value);
	});

	return result;
}

function transform(originalDataSet: DataSet, sortState: SortState, filterState: FilterState) {
	const filtered = filterRows(originalDataSet.rows, filterState);
	const sorted = sortRows(filtered, sortState);

	const result: DataSet = {
		rows: sorted
	};

	return result;
}

export const repository = derived([dataset, sort, filter], ([$dataset, $sort, $filter]) =>
	transform($dataset, $sort, $filter)
);
