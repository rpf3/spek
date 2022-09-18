<script lang="ts">
	import type { Column } from '$lib/table/types';

	import { filter } from '$lib/table/stores/filter';
	import { page } from '$lib/table/stores/page';
	import { onDestroy } from 'svelte';

	import Filter from '$lib/icon/Filter.svelte';
	import Menu from '$lib/menu/Menu.svelte';
	import FilterChip from '$lib/table/components/FilterChip.svelte';

	export let columns: Column[];

	let isMenuVisible = false;
	let filterableColumns = columns.filter((column) => column.filterable);
	let availableColumns = filterableColumns;

	function getColumn(key: string): Column {
		const result = filterableColumns.find((filter) => {
			return filter.key === key;
		});

		// Assume that a result was found.
		return result as Column;
	}

	function selectFilter(column: Column) {
		filter.update(column.key, null);
		isMenuVisible = false;
	}

	const unsubscribe = filter.subscribe((state) => {
		page.set(0);

		const filteredKeys = state.filters.map((filter) => filter.key);

		availableColumns = filterableColumns.filter((column) => {
			return filteredKeys.includes(column.key) === false;
		});
	});

	onDestroy(unsubscribe);
</script>

{#if $filter.filters.length > 0}
	<div class="inline mr-3">
		<div class="flex gap-3">
			{#each $filter.filters as filter (filter.key)}
				<FilterChip column={getColumn(filter.key)} />
			{/each}
		</div>
	</div>
{/if}

{#if filterableColumns.length > 0}
	<Menu bind:visible={isMenuVisible}>
		<button slot="toggle">
			<Filter />
		</button>

		<div slot="content" class="w-48">
			{#if availableColumns.length > 0}
				<ul>
					{#each availableColumns as column}
						<li class="px-3 my-1 cursor-pointer" on:click={() => selectFilter(column)}>
							{column.header}
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-center">None available.</p>
			{/if}
		</div>
	</Menu>
{/if}
