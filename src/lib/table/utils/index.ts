import type { DataRow } from '$lib/table/types';
import type { DataItemValue } from '$lib/table/types';

function getCellValue(row: DataRow, key: string): DataItemValue | null {
	const dataItem = row.items.find((item) => item.key === key);

	if (dataItem === undefined) {
		return null;
	}

	return dataItem.value;
}

const utils = { getCellValue };

export default utils;
