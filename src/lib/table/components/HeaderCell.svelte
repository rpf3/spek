<script lang="ts">
	import type { Column } from '$lib/table/types';

	import { SORT_DIRECTION } from '$lib/table/types';
	import { sort } from '$lib/table/stores/sort';

	import Up from '$lib/icon/Up.svelte';
	import Down from '$lib/icon/Down.svelte';

	export let column: Column;

	function sortRows() {
		if (!column.sortable) {
			return;
		}

		sort.set(column.key);
	}
</script>

<div
	class="flex items-center gap-1 font-semibold"
	class:cursor-pointer={column.sortable}
	on:click={sortRows}
>
	{#if column.slots?.header}
		<svelte:component this={column.slots.header} {column} />
	{:else}
		<span class="overflow-hidden">{column.header}</span>
	{/if}

	{#if column.sortable && $sort?.key === column.key}
		{#if $sort.direction === SORT_DIRECTION.ASCENDING}
			<Up />
		{:else if $sort.direction === SORT_DIRECTION.DESCENDING}
			<Down />
		{/if}
	{/if}
</div>
