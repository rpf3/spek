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
	import Paginator from '$lib/paginator/Paginator.svelte';
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

	function previousHandler() {
		page.previous();
	}

	function netxtHandler() {
		page.next();
	}

	function gotoHandler(event: CustomEvent) {
		page.set(event.detail);
	}
</script>

<div class="mb-3 flex items-center justify-end">
	<Filter {columns} />
</div>

<div class="grid grid-cols-{columnCount} gap-3">
	{#each columns as column}
		<Cell {column}>
			<HeaderCell {column} />
		</Cell>
	{/each}

	{#each $repository.rows as row}
		{#each columns as column}
			<Cell {column}>
				<DataCell {row} {column} />
			</Cell>
		{/each}
	{/each}

	{#if $repository.total === 0}
		<div class="col-span-full text-center">No results.</div>
	{/if}
</div>

{#if mergedConfig.pagination.enabled}
	<div class="mt-6 flex justify-center">
		<Paginator
			count={Math.ceil($repository.total / $page.take)}
			current={$page.number}
			on:previous={previousHandler}
			on:next={netxtHandler}
			on:goto={gotoHandler}
		/>
	</div>
{/if}
