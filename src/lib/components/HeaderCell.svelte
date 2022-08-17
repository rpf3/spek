<script lang="ts">
	import type { Column } from '$lib/types';

	import { SortDirection } from '$lib/types';
	import { filter } from '$lib/stores/filter';
	import { sort } from '$lib/stores/sort';

	import Ascending from './icons/Ascending.svelte';
	import Cell from './Cell.svelte';
	import Descending from './icons/Descending.svelte';
	import Filter from './icons/Filter.svelte';

	export let column: Column;

	let filterValue: string;
	let isFilterHidden = true;

	function sortRows() {
		sort.set(column.key);
	}

	function filterRows(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			filter.set({
				key: column.key,
				value: filterValue
			});
		}
	}

	function toggleFilter() {
		isFilterHidden = !isFilterHidden;
	}

	function hideFilter() {
		isFilterHidden = true;
	}
</script>

<svelte:window on:click={hideFilter} />

<Cell>
	<div class="flex items-end gap-1 font-semibold cursor-pointer">
		<span class="overflow-hidden" on:click={sortRows}>{column.header}</span>

		<div class="relative flex">
			<button class="text-slate-200" on:click|stopPropagation={toggleFilter}>
				<Filter />
			</button>

			<div
				class="absolute left-0 top-full p-5 border border-slate-200 rounded bg-white cursor-default"
				class:hidden={isFilterHidden}
				on:click|stopPropagation
			>
				<input
					type="text"
					class="border border-slate-200 rounded px-2 py-1"
					bind:value={filterValue}
					on:keyup={filterRows}
				/>
			</div>
		</div>

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
