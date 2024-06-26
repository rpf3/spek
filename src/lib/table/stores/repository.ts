import type { DataSet, FilterValue } from '$lib/table/types';
import type { FilterState } from '$lib/table/types';
import type { SortState } from '$lib/table/types';
import type { DataRow } from '$lib/table/types';
import type { PageState } from '$lib/table/types';

import { derived } from 'svelte/store';
import { dataset } from '$lib/table/stores/dataset';
import { filter } from '$lib/table/stores/filter';
import { sort } from '$lib/table/stores/sort';
import { page } from '$lib/table/stores/page';
import { SORT_DIRECTION } from '$lib/table/types';
import utils from '$lib/table/utils';

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
	if (state === undefined || state === null || state.direction === SORT_DIRECTION.NONE) {
		return rows;
	}

	const result = [...rows].sort((row1: DataRow, row2: DataRow) => {
		if (state.direction === SORT_DIRECTION.ASCENDING) {
			return rowComparator(row1, row2, state.key);
		}

		return rowComparator(row2, row1, state.key);
	});

	return result;
}

function applyFilter(rows: DataRow[], filter: FilterValue): DataRow[] {
	if (filter.value === null) {
		return rows;
	}

	const filterValue = filter.value as string;

	const result = rows.filter((row) => {
		const dataItemValue = utils.getCellValue(row, filter.key);

		if (dataItemValue === null) {
			return false;
		}

		return dataItemValue.toString().includes(filterValue);
	});

	return result;
}

function filterRows(rows: DataRow[], state: FilterState): DataRow[] {
	if (state === undefined || state === null) {
		return rows;
	}

	let result = rows;

	for (let i = 0; i < state.filters.length; i++) {
		result = applyFilter(result, state.filters[i]);
	}

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
	filterState: FilterState,
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
