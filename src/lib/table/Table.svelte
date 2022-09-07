<script lang="ts">
	import type { Column } from '$lib/table/types';
	import type { Config } from '$lib/table/types';

	import { dataset } from '$lib/table/stores/dataset';
	import { repository } from '$lib/table/stores/repository';
	import { page } from '$lib/table/stores/page';
	import { defaultConfig } from '$lib/table/types';

	import Cell from './components/Cell.svelte';
	import DataCell from './components/DataCell.svelte';
	import HeaderCell from './components/HeaderCell.svelte';
	import Paginator from './components/Paginator.svelte';
	import TableFilter from '$lib/table/components/TableFilter.svelte';

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
	<TableFilter {columns} />
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
</div>

{#if mergedConfig.pagination.enabled}
	<div class="flex justify-end gap-1 mt-3">
		<Paginator />
	</div>
{/if}
