<script lang="ts">
	import type { Column } from '$lib/types';

	import { createEventDispatcher } from 'svelte';

	import Cell from './Cell.svelte';

	export let column: Column;

	const dispatch = createEventDispatcher();

	function dispatchSortEvent() {
		dispatch('sort', column.key);
	}
</script>

<Cell>
	<div class="font-semibold cursor-pointer" on:click={dispatchSortEvent}>
		{column.header}
	</div>
</Cell>
