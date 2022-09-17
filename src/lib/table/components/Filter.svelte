<script lang="ts">
	import type { Column } from '$lib/table/types';

	import { filter } from '$lib/table/stores/filter';
	import { page } from '$lib/table/stores/page';
	import { onDestroy } from 'svelte';

	import Filter from '$lib/icon/Filter.svelte';
	import Menu from '$lib/menu/Menu.svelte';
	import FilterChip from '$lib/table/components/FilterChip.svelte';

	export let columns: Column[];

	let filterableColumns = columns.filter((column) => column.filterable);

	let potentialFilters: Column[] = [];

	function addFilterChip(column: Column) {
		potentialFilters = [...potentialFilters, column];
	}

	function removeFilterChip(event: CustomEvent) {
		const removed: Column = event.detail.column;

		potentialFilters = potentialFilters.filter((filter) => {
			return filter.key !== removed.key;
		});
	}

	const unsubscribe = filter.subscribe(() => {
		page.set(0);
	});

	onDestroy(unsubscribe);
</script>

{#if potentialFilters.length > 0}
	<div class="inline mr-3">
		<div class="flex gap-3">
			{#each potentialFilters as column}
				<FilterChip {column} on:remove={removeFilterChip} />
			{/each}
		</div>
	</div>
{/if}

{#if filterableColumns.length > 0}
	<Menu>
		<button slot="toggle">
			<Filter />
		</button>

		<ul slot="content" class="w-48">
			{#each filterableColumns as column}
				<li class="px-3 my-1 cursor-pointer" on:click={() => addFilterChip(column)}>
					{column.header}
				</li>
			{/each}
		</ul>
	</Menu>
{/if}
