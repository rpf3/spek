<script lang="ts">
	import type { Column } from '$lib/table/types';

	import { filter } from '$lib/table/stores/filter';
	import { COLOR_MODE, FILL_MODE } from '$lib/types';

	import Chip from '$lib/chip/Chip.svelte';
	import Menu from '$lib/menu/Menu.svelte';
	import Down from '$lib/icon/Down.svelte';
	import Trash from '$lib/icon/Trash.svelte';
	import XCircle from '$lib/icon/XCircle.svelte';

	export let column: Column;

	let value: string;

	function updateFilter() {
		filter.update(column.key, value);
	}

	function removeFilter() {
		filter.remove(column.key);
	}

	function clearFilter() {
		value = '';

		updateFilter();
	}
</script>

<Menu>
	<div slot="toggle" class="cursor-pointer">
		<Chip fill={FILL_MODE.FILL} color={COLOR_MODE.PRIMARY}>
			<span class="font-semibold">{column.header}</span>

			{#if value}
				<span class="max-w-[8rem] overflow-hidden text-ellipsis whitespace-nowrap">{value}</span>
			{/if}

			<Down />
		</Chip>
	</div>

	<div slot="content" class="flex gap-3 p-1">
		<button type="button" class="text-spek-facade-400 dark:text-inherit" on:click={removeFilter}>
			<Trash />
		</button>

		<div class="relative">
			<input
				type="text"
				bind:value
				on:change={updateFilter}
				class="w-36 rounded border bg-spek-facade-50 p-1 pr-6 text-sm outline-none outline-offset-0 focus:outline-spek-primary-400 dark:border-transparent dark:bg-spek-facade-500"
			/>

			<button
				type="button"
				class="absolute inset-y-0 right-0 flex items-center pr-1 text-spek-facade-400 dark:text-inherit"
				on:click={clearFilter}
			>
				<XCircle />
			</button>
		</div>
	</div>
</Menu>
