<script lang="ts">
	import type { Column } from '$lib/types';
	import type { DataItem } from '$lib/types';
	import type { DataRow } from '$lib/types';

	import Cell from './Cell.svelte';

	export let column: Column;
	export let row: DataRow;

	function getDataItem(row: DataRow, key: string): DataItem | null {
		const result = row.items.find((item) => item.key === key);

		if (result === undefined) {
			return null;
		}

		return result;
	}
</script>

<Cell>
	{getDataItem(row, column.key)?.value}
</Cell>
