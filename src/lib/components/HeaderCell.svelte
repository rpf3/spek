<script lang="ts">
	import type { Column } from '$lib/types';

	import { SortDirection } from '$lib/types';
	import { sort } from '$lib/stores/sort';

	import Ascending from './icons/Ascending.svelte';
	import Descending from './icons/Descending.svelte';

	export let column: Column;

	function sortRows() {
		if (!column.sortable) {
			return;
		}

		sort.set(column.key);
	}
</script>

<div class="flex items-end gap-1 font-semibold" class:cursor-pointer={column.sortable}>
	<span class="overflow-hidden" on:click={sortRows}>{column.header}</span>

	{#if $sort?.key === column.key}
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
