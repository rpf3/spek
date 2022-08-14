<script lang="ts">
	import type { Column } from '$lib/types';

	import Cell from './Cell.svelte';
	import Row from './Row.svelte';

	export let columns: Column[];
	export let data: any[];
</script>

<div class="flex flex-col">
	<Row>
		<svelte:fragment>
			{#each columns as column}
				<Cell>
					{column.name}
				</Cell>
			{/each}
		</svelte:fragment>
	</Row>

	{#each data as item}
		<Row>
			<svelte:fragment>
				{#each columns as column}
					<Cell>
						{item[column.id]}
					</Cell>
				{/each}
			</svelte:fragment>
		</Row>
	{/each}
</div>
