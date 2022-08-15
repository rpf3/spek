<script lang="ts">
	import type { Column } from '$lib/types';

	import { SortDirection } from '$lib/types';
	import { repository } from '$lib/stores/repository';
	import { sort } from '$lib/stores/sort';

	import Ascending from './icons/Ascending.svelte';
	import Cell from './Cell.svelte';
	import Descending from './icons/Descending.svelte';

	export let column: Column;

	let filter: string;

	function sortRows() {
		sort.set(column.key);
		repository.sort($sort.key, $sort.direction);
	}

	function filterRows(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			repository.filter(column.key, filter);
		}
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

	<input type="text" class="border rounded" bind:value={filter} on:keyup={filterRows} />
</Cell>
