<script lang="ts">
	import type { Column } from '$lib/types';

	import Row from './Row.svelte';

	export let columns: Column[];
</script>

<div class="flex">
	<Row>
		<svelte:fragment>
			{#each columns as column}
				<div>{column.name}</div>
			{/each}
		</svelte:fragment>
	</Row>
</div>
