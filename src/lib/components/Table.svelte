<script lang="ts">
	import type { Column } from '$lib/types';
	import type { Config } from '$lib/types';

	import { dataset } from '$lib/stores/dataset';
	import { repository } from '$lib/stores/repository';
	import { page } from '$lib/stores/page';
	import { defaultConfig } from '$lib/types';

	import Cell from './Cell.svelte';
	import DataCell from './DataCell.svelte';
	import HeaderCell from './HeaderCell.svelte';
	import Row from './Row.svelte';
	import Paginator from './Paginator.svelte';
	import TableFilter from '$lib/components/TableFilter.svelte';

	export let columns: Column[];
	export let data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	export let config: Config = defaultConfig;

	const mergedConfig = Object.assign(defaultConfig, config);

	dataset.init(data);
	page.init(mergedConfig);
</script>

<div class="flex justify-between">
	<TableFilter {columns} />

	{#if mergedConfig.pagination.enabled}
		<Paginator />
	{/if}
</div>
<div class="flex flex-col gap-1 divide-y divide-solid p-2">
	<Row>
		<svelte:fragment>
			{#each columns as column}
				<Cell>
					<HeaderCell {column} />
				</Cell>
			{/each}
		</svelte:fragment>
	</Row>

	{#each $repository.rows as row}
		<Row>
			<svelte:fragment>
				{#each columns as column}
					<Cell>
						{#if column.slots?.cell}
							<svelte:component this={column.slots.cell} {row} {column} />
						{:else}
							<DataCell {row} {column} />
						{/if}
					</Cell>
				{/each}
			</svelte:fragment>
		</Row>
	{/each}
</div>
