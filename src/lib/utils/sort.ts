import type { DataRow } from '$lib/types';

import { getRowValue } from '$lib/utils';

function comparator(row1: DataRow, row2: DataRow, key: string): number {
	const value1 = getRowValue(row1, key) || '';
	const value2 = getRowValue(row2, key) || '';

	return value1.toString().localeCompare(value2.toString());
}

function sort(rows: DataRow[], key: string, ascending: boolean): DataRow[] {
	rows.sort((row1: DataRow, row2: DataRow) => {
		if (ascending) {
			return comparator(row1, row2, key);
		}

		return comparator(row2, row1, key);
	});

	return rows;
}

export { sort };
