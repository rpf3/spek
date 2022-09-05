import type { DataRow } from '$lib/types';

function getCellValue(row: DataRow, key: string): string | number | null {
	const dataItem = row.items.find((item) => item.key === key);

	if (dataItem === undefined) {
		return null;
	}

	return dataItem.value;
}

const utils = { getCellValue };

export default utils;
