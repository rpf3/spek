<script lang="ts">
	import type { Column } from '$lib/types';

	import { SortDirection } from '$lib/types';
	import { rows } from '$lib/stores/rows';

	import DataCell from './DataCell.svelte';
	import HeaderCell from './HeaderCell.svelte';
	import Row from './Row.svelte';

	export let columns: Column[];
	export let data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any

	rows.init(data);

	let sortKey: string;
	let sortDirection: SortDirection = SortDirection.None;

	function changeSortDirection() {
		if (sortDirection === SortDirection.None) {
			sortDirection = SortDirection.Ascending;
			return;
		}

		if (sortDirection === SortDirection.Descending) {
			sortDirection = SortDirection.Ascending;
			return;
		}

		if (sortDirection === SortDirection.Ascending) {
			sortDirection = SortDirection.Descending;
			return;
		}
	}

	function handleSortEvent(event: CustomEvent) {
		sortKey = event.detail;

		changeSortDirection();

		rows.sort(sortKey, sortDirection);
	}
</script>

<div class="flex flex-col gap-1 divide-y divid-solid p-2">
	<Row>
		<svelte:fragment>
			{#each columns as column}
				<HeaderCell {column} {sortKey} {sortDirection} on:sort={handleSortEvent} />
			{/each}
		</svelte:fragment>
	</Row>

	{#each $rows as row}
		<Row>
			<svelte:fragment>
				{#each columns as column}
					<DataCell {row} {column} />
				{/each}
			</svelte:fragment>
		</Row>
	{/each}
</div>
