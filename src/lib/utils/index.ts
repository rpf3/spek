import type { DataRow } from '$lib/types';

function getRowValue(row: DataRow, key: string): string | number | null {
	const dataItem = row.items.find((item) => item.key === key);

	if (dataItem === undefined) {
		return null;
	}

	return dataItem.value;
}

export { getRowValue };
