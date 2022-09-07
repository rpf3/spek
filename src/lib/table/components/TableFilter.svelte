<script lang="ts">
	import type { Column } from '$lib/table/types';

	import { filter } from '$lib/table/stores/filter';
	import { page } from '$lib/table/stores/page';
	import { onDestroy } from 'svelte';

	import Filter from './icons/Filter.svelte';
	import Modal from './Modal.svelte';
	import PrimaryButton from './PrimaryButton.svelte';
	import SecondaryButton from './SecondaryButton.svelte';

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
	}

	function applyFilter() {
		filter.set({
			key: selectedFilterKey,
			value: selectedFilterValue
		});

		closeFilterModal();
	}

	function clearFilter() {
		filter.set(null);

		selectedFilterKey = filterableColumns.at(0)?.key || '';
		selectedFilterValue = '';

		closeFilterModal();
	}

	const unsubscribe = filter.subscribe(() => {
		page.set({
			skip: 0,
			take: $page.take
		});
	});

	onDestroy(unsubscribe);
</script>

{#if filterableColumns.length > 0}
	<button on:click={openFilterModal}>
		<Filter />
	</button>
{/if}

{#if isModalVisible}
	<Modal on:close={closeFilterModal}>
		<p slot="header">Filter</p>

		<div slot="body" class="grid grid-cols-2 gap-5">
			<select bind:value={selectedFilterKey} class="border border-slate-200 rounded px-1 py-1">
				{#each filterableColumns as column}
					<option value={column.key}>{column.header}</option>
				{/each}
			</select>

			<input
				type="text"
				class="border border-slate-200 rounded px-2 py-1"
				bind:value={selectedFilterValue}
			/>
		</div>

		<div slot="footer" class="flex flex-row gap-3">
			<SecondaryButton on:click={clearFilter}>Clear</SecondaryButton>
			<PrimaryButton on:click={applyFilter}>Apply</PrimaryButton>
		</div>
	</Modal>
{/if}
