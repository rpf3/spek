<script lang="ts">
	import type { Column } from '$lib/types';
	import type { DataRow } from '$lib/types';

	import DataCell from './DataCell.svelte';
	import HeaderCell from './HeaderCell.svelte';
	import Row from './Row.svelte';

	export let columns: Column[];
	export let data: DataRow[];
</script>

<div class="flex flex-col gap-1">
	<Row>
		<svelte:fragment>
			{#each columns as column}
				<HeaderCell {column} />
			{/each}
		</svelte:fragment>
	</Row>

	{#each data as row}
		<Row>
			<svelte:fragment>
				{#each columns as column}
					<DataCell {row} {column} />
				{/each}
			</svelte:fragment>
		</Row>
	{/each}
</div>
