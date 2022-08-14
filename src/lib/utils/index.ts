import type { DataRow } from '$lib/types';

function getRowValue(row: DataRow, key: string): string | null {
	const dataItem = row.items.find((item) => item.key === key);

	if (dataItem === undefined) {
		return null;
	}

	return dataItem.value;
}

export { getRowValue };
