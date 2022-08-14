<script lang="ts">
	import type { Column } from '$lib/types';

	import { createEventDispatcher } from 'svelte';
	import { SortDirection } from '$lib/types';

	import Ascending from './icons/Ascending.svelte';
	import Cell from './Cell.svelte';
	import Descending from './icons/Descending.svelte';

	export let column: Column;
	export let sortKey: string;
	export let sortDirection: SortDirection = SortDirection.None;

	const dispatch = createEventDispatcher();

	function dispatchSortEvent() {
		dispatch('sort', column.key);
	}
</script>

<Cell>
	<div class="flex items-end gap-1 font-semibold cursor-pointer" on:click={dispatchSortEvent}>
		<span>{column.header}</span>

		{#if sortKey === column.key}
			{#if sortDirection === SortDirection.Ascending}
				<div>
					<Ascending />
				</div>
			{:else if sortDirection === SortDirection.Descending}
				<div>
					<Descending />
				</div>
			{/if}
		{/if}
	</div>
</Cell>
