<script lang="ts">
	import type { Column } from '$lib/types';

	import { SortDirection } from '$lib/types';
	import { rows } from '$lib/stores/rows';
	import { sort } from '$lib/stores/sort';

	import Ascending from './icons/Ascending.svelte';
	import Cell from './Cell.svelte';
	import Descending from './icons/Descending.svelte';

	export let column: Column;

	function sortRows() {
		sort.set(column.key);
		rows.sort($sort.key, $sort.direction);
	}
</script>

<Cell>
	<div class="flex items-end gap-1 font-semibold cursor-pointer" on:click={sortRows}>
		<span>{column.header}</span>

		{#if $sort.key === column.key}
			{#if $sort.direction === SortDirection.Ascending}
				<div>
					<Ascending />
				</div>
			{:else if $sort.direction === SortDirection.Descending}
				<div>
					<Descending />
				</div>
			{/if}
		{/if}
	</div>
</Cell>
