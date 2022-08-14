import type { DataRow } from '$lib/types';

import { getRowValue } from '$lib/utils';
import { SortDirection } from '$lib/types';

function comparator(row1: DataRow, row2: DataRow, key: string): number {
	const value1 = getRowValue(row1, key) || '';
	const value2 = getRowValue(row2, key) || '';

	return value1.localeCompare(value2);
}

function sort(rows: DataRow[], key: string, direction: SortDirection): DataRow[] {
	rows.sort((row1: DataRow, row2: DataRow) => {
		if (direction === SortDirection.Ascending) {
			return comparator(row1, row2, key);
		}

		return comparator(row2, row1, key);
	});

	return rows;
}

export { sort };
