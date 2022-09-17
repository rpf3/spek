<script lang="ts">
	import type { Column } from '$lib/table/types';

	import { filter } from '$lib/table/stores/filter';
	import { page } from '$lib/table/stores/page';
	import { onDestroy } from 'svelte';
	import { ButtonType, ButtonMode } from '$lib/button/types';

	import Filter from '$lib/icon/Filter.svelte';
	import Dialog from '$lib/dialog/Dialog.svelte';
	import Button from '$lib/button/Button.svelte';
	import Close from '$lib/icon/Close.svelte';
	import Chip from '$lib/chip/Chip.svelte';

	export let columns: Column[];

	let filterableColumns = columns.filter((column) => column.filterable);

	let isModalVisible = false;

	let selectedFilterKey: string;
	let selectedFilterValue: string;

	function openFilterModal() {
		isModalVisible = true;
	}

	function closeFilterModal() {
		isModalVisible = false;

		selectedFilterKey = filterableColumns.at(0)?.key || '';
		selectedFilterValue = '';
	}

	function applyFilter() {
		filter.add(selectedFilterKey, selectedFilterValue);

		closeFilterModal();
	}

	function clearFilter() {
		filter.clear();

		closeFilterModal();
	}

	function removeFilter(key: string) {
		filter.remove(key);
	}

	const unsubscribe = filter.subscribe(() => {
		page.set(0);
	});

	onDestroy(unsubscribe);
</script>

{#if $filter.filters.length > 0}
	<div class="inline mr-3">
		<div class="flex gap-3">
			{#each $filter.filters as filter}
				<Chip>
					<span class="font-bold">{filter.key}:</span>
					<span>{filter.value}</span>
					<button on:click={() => removeFilter(filter.key)}>
						<Close />
					</button>
				</Chip>
			{/each}
		</div>
	</div>
{/if}

{#if filterableColumns.length > 0}
	<button on:click={openFilterModal}>
		<Filter />
	</button>
{/if}

{#if isModalVisible}
	<Dialog on:close={closeFilterModal}>
		<p slot="header">Filter</p>

		<div slot="body" class="grid grid-cols-2 gap-5">
			<select
				bind:value={selectedFilterKey}
				class="border rounded px-1 py-1 focus:outline-none dark:bg-spek-facade"
			>
				{#each filterableColumns as column}
					<option value={column.key}>{column.header}</option>
				{/each}
			</select>

			<input
				type="text"
				class="border rounded px-2 py-1 focus:outline-none dark:bg-spek-facade"
				bind:value={selectedFilterValue}
			/>
		</div>

		<div slot="footer" class="flex flex-row gap-3">
			<Button type={ButtonType.Primary} mode={ButtonMode.Ring} on:click={clearFilter}>Clear</Button>
			<Button type={ButtonType.Primary} mode={ButtonMode.Fill} on:click={applyFilter}>Apply</Button>
		</div>
	</Dialog>
{/if}
