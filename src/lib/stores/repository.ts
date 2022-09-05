import type { DataSet } from '$lib/types';
import type { FilterState } from '$lib/types';
import type { SortState } from '$lib/types';
import type { DataRow } from '$lib/types';
import type { PageState } from '$lib/types';

import { derived } from 'svelte/store';
import { dataset } from './dataset';
import { filter } from './filter';
import { sort } from './sort';
import { page } from './page';
import { SortDirection } from '$lib/types';
import utils from '$lib/utils';

function rowComparator(row1: DataRow, row2: DataRow, key: string): number {
	const value1 = utils.getCellValue(row1, key);
	const value2 = utils.getCellValue(row2, key);

	if (value1 === value2) {
		return 0;
	}

	if (value1 === null) {
		return -1;
	}

	if (value2 === null) {
		return 1;
	}

	return value1 < value2 ? -1 : 1;
}

function sortRows(rows: DataRow[], state: SortState): DataRow[] {
	if (state === undefined || state === null || state.direction === SortDirection.None) {
		return rows;
	}

	const result = [...rows].sort((row1: DataRow, row2: DataRow) => {
		if (state.direction === SortDirection.Ascending) {
			return rowComparator(row1, row2, state.key);
		}

		return rowComparator(row2, row1, state.key);
	});

	return result;
}

function filterRows(rows: DataRow[], state: FilterState | null): DataRow[] {
	if (state === undefined || state === null) {
		return rows;
	}

	const result = rows.filter((row) => {
		const dataItemValue = utils.getCellValue(row, state.key);

		if (dataItemValue === null) {
			return false;
		}

		return dataItemValue.toString().includes(state.value);
	});

	return result;
}

function pageRows(rows: DataRow[], state: PageState | null): DataRow[] {
	if (state === undefined || state === null) {
		return rows;
	}

	const result = rows.slice(state.skip, state.skip + state.take);

	return result;
}

function transform(
	originalDataSet: DataSet,
	sortState: SortState,
	filterState: FilterState | null,
	pageState: PageState | null
) {
	const filtered = filterRows(originalDataSet.rows, filterState);
	const sorted = sortRows(filtered, sortState);
	const paged = pageRows(sorted, pageState);

	const result: DataSet = {
		rows: paged,
		total: filtered.length
	};

	return result;
}

export const repository = derived(
	[dataset, sort, filter, page],
	([$dataset, $sort, $filter, $page]) => transform($dataset, $sort, $filter, $page)
);
