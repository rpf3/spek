<script lang="ts">
	import type { Column } from '$lib/table/types';

	import { filter } from '$lib/table/stores/filter';

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

<Chip>
	<span class="font-semibold">{column.header}</span>

	{#if value}
		<span class="max-w-[8rem] whitespace-nowrap overflow-hidden text-ellipsis">{value}</span>
	{/if}

	<Menu>
		<button slot="toggle">
			<Down />
		</button>

		<div slot="content" class="flex gap-3 p-1">
			<button on:click={removeFilter}>
				<Trash />
			</button>

			<div class="relative">
				<input
					type="text"
					bind:value
					on:change={updateFilter}
					class="text-sm bg-spek-facade border rounded w-36 p-1 pr-6"
				/>

				<button class="absolute right-0 flex items-center inset-y-0 pr-1" on:click={clearFilter}>
					<XCircle />
				</button>
			</div>
		</div>
	</Menu>
</Chip>
