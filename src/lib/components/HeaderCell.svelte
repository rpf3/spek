<script lang="ts">
	import type { Column } from '$lib/types';

	import { SortDirection } from '$lib/types';
	import { repository } from '$lib/stores/repository';
	import { sort } from '$lib/stores/sort';

	import Ascending from './icons/Ascending.svelte';
	import Cell from './Cell.svelte';
	import Descending from './icons/Descending.svelte';
	import Filter from './icons/Filter.svelte';

	export let column: Column;

	let filter: string;
	let filterHidden = true;

	function sortRows() {
		sort.set(column.key);
		repository.sort($sort.key, $sort.direction);
	}

	function filterRows(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			repository.filter(column.key, filter);
		}
	}

	function toggleFilter() {
		filterHidden = !filterHidden;
	}
</script>

<Cell>
	<div class="flex items-end gap-1 font-semibold cursor-pointer">
		<span class="overflow-hidden" on:click={sortRows}>{column.header}</span>

		<div class="relative flex">
			<button class="text-slate-200" on:click|stopPropagation={toggleFilter}>
				<Filter />
			</button>

			<div
				class="absolute left-0 top-full p-5 border border-slate-200 rounded bg-white"
				class:hidden={filterHidden}
			>
				<input
					type="text"
					class="border border-slate-200 rounded px-2 py-1"
					bind:value={filter}
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
