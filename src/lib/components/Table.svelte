<script lang="ts">
	import type { Column } from '$lib/types';
	import type { DataRow } from '$lib/types';

	import { createDataRows } from '$lib/utils';

	import DataCell from './DataCell.svelte';
	import HeaderCell from './HeaderCell.svelte';
	import Row from './Row.svelte';

	export let columns: Column[];
	export let data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any

	let rows: DataRow[] = createDataRows(data);

	function handleSortEvent(event: CustomEvent) {
		return;
	}
</script>

<div class="flex flex-col gap-1 divide-y divid-solid p-2">
	<Row>
		<svelte:fragment>
			{#each columns as column}
				<HeaderCell {column} on:sort={handleSortEvent} />
			{/each}
		</svelte:fragment>
	</Row>

	{#each rows as row}
		<Row>
			<svelte:fragment>
				{#each columns as column}
					<DataCell {row} {column} />
				{/each}
			</svelte:fragment>
		</Row>
	{/each}
</div>
