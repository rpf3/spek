<script lang="ts">
	import type { Column } from '$lib/types';
	import type { DataRow } from '$lib/types';

	import { getRowValue } from '$lib/utils';

	import Cell from './Cell.svelte';

	export let column: Column;
	export let row: DataRow;
</script>

<Cell>
	<div class="overflow-hidden whitespace-nowrap text-ellipsis">{getRowValue(row, column.key)}</div>
</Cell>
