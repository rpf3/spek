<script lang="ts">
	import type { Column } from '$lib/table/types';
	import type { Config } from '$lib/table/types';

	import { dataset } from '$lib/table/stores/dataset';
	import { repository } from '$lib/table/stores/repository';
	import { page } from '$lib/table/stores/page';
	import { defaultConfig } from '$lib/table/types';

	import Cell from '$lib/table/components/Cell.svelte';
	import DataCell from '$lib/table/components/DataCell.svelte';
	import HeaderCell from '$lib/table/components/HeaderCell.svelte';
	import Paginator from '$lib/table/components/Paginator.svelte';
	import Filter from '$lib/table/components/Filter.svelte';

	export let columns: Column[];
	export let data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	export let config: Config = defaultConfig;

	const mergedConfig = Object.assign(defaultConfig, config);

	const columnCount = columns
		.map((column) => column.size ?? 1)
		.reduce((total, current) => {
			return total + current;
		}, 0);

	dataset.init(data);
	page.init(mergedConfig);
</script>

<div class="flex justify-end mb-3">
	<Filter {columns} />
</div>

<div class="grid grid-cols-{columnCount} gap-y-3">
	{#each columns as column}
		<Cell {column}>
			<HeaderCell {column} />
		</Cell>
	{/each}

	{#each $repository.rows as row}
		{#each columns as column}
			<Cell {column}>
				{#if column.slots?.cell}
					<svelte:component this={column.slots.cell} {row} {column} />
				{:else}
					<DataCell {row} {column} />
				{/if}
			</Cell>
		{/each}
	{/each}

	{#if $repository.total === 0}
		<div class="col-span-full text-center">No results.</div>
	{/if}
</div>

{#if mergedConfig.pagination.enabled}
	<div class="flex justify-center mt-6">
		<Paginator />
	</div>
{/if}
