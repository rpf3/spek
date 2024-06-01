<script lang="ts">
	import type { SelectOption } from '$lib/combobox/types';
	import type { ComboboxSearchPayload } from '$lib/combobox/types';
	import type { ComboboxChangePayload } from '$lib/combobox/types';

	import { createEventDispatcher } from 'svelte';

	export let options: SelectOption[] = [];
	export let value: SelectOption | undefined = undefined;

	const dispatch = createEventDispatcher<{
		search: ComboboxSearchPayload;
		change: ComboboxChangePayload;
	}>();

	let container: HTMLElement;
	let searchText: string;
	let isOpen = false;

	function showOptions() {
		isOpen = true;
	}

	function hideOptions() {
		isOpen = false;
	}

	function searchHandler() {
		dispatch('search', {
			text: searchText
		});
	}

	function selectOption(option: SelectOption) {
		value = option;
		searchText = option.text;

		hideOptions();

		dispatch('change', {
			value: value
		});
	}

	function windowHandler(event: MouseEvent) {
		if (!isOpen) {
			return;
		}

		const target = event.target as HTMLElement;

		if (!container.contains(target)) {
			hideOptions();
		}
	}
</script>

<svelte:window on:click={windowHandler} />

<div class="flex flex-col gap-2">
	<div class="relative" bind:this={container}>
		<input
			type="text"
			bind:value={searchText}
			on:input={searchHandler}
			on:focus={showOptions}
			class="w-full rounded border bg-spek-facade-50 p-1 text-sm outline-none outline-offset-0 focus:outline-spek-primary-400 dark:border-transparent dark:bg-spek-facade-500"
		/>

		<ul
			class="absolute z-10 mt-2 max-h-36 w-full flex-col gap-2 overflow-auto rounded bg-spek-facade-50 px-2 py-1 dark:bg-spek-facade-500"
			class:hidden={isOpen === false}
			class:flex={isOpen === true}
		>
			{#if options.length > 0}
				{#each options as option}
					<li
						class="cursor-pointer rounded px-2 py-1 hover:dark:bg-spek-facade-600"
						on:click={() => selectOption(option)}
					>
						{option.text}
					</li>
				{/each}
			{:else}
				<li class="rounded px-2 py-1">No Results.</li>
			{/if}
		</ul>
	</div>
</div>
