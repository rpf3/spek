<script lang="ts">
	import type { Column } from '$lib/table/types';
	import type { DataRow } from '$lib/table/types';

	import utils from '$lib/table/utils';
	import { DateTime } from 'luxon';

	export let column: Column;
	export let row: DataRow;
</script>

{#if column.slots?.cell}
	<svelte:component this={column.slots.cell} {row} {column} />
{:else}
	{@const cellValue = utils.getCellValue(row, column.key)}

	<div class="overflow-hidden whitespace-nowrap text-ellipsis">
		{#if cellValue instanceof Date}
			{DateTime.fromJSDate(cellValue).toLocaleString()}
		{:else}
			{cellValue}
		{/if}
	</div>
{/if}
