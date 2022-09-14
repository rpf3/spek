<script lang="ts">
	import type { Column } from '$lib/table/types';
	import type { DataRow } from '$lib/table/types';

	import utils from '$lib/table/utils';

	export let column: Column;
	export let row: DataRow;
</script>

{#if column.slots?.cell}
	<svelte:component this={column.slots.cell} {row} {column} />
{:else}
	<div class="overflow-hidden whitespace-nowrap text-ellipsis">
		{utils.getCellValue(row, column.key)}
	</div>
{/if}
