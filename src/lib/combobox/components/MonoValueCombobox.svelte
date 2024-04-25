<script lang="ts">
	import type { SelectOption, MonoComboboxValue } from '$lib/combobox/types';

	import { createEventDispatcher } from 'svelte';

	export let options: SelectOption[] = [];
	export let value: MonoComboboxValue;

	const dispatch = createEventDispatcher();

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
		value.selection = option;
		searchText = option.text;

		hideOptions();
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
			class="text-sm bg-spek-facade-50 dark:bg-spek-facade-500 border dark:border-transparent rounded w-full p-1 focus:outline-spek-primary-400 outline-none outline-offset-0"
		/>

		<ul
			class="absolute z-10 bg-spek-facade-50 dark:bg-spek-facade-500 w-full mt-2 px-2 py-1 flex-col gap-2 rounded max-h-36 overflow-auto"
			class:hidden={isOpen === false}
			class:flex={isOpen === true}
		>
			{#if options.length > 0}
				{#each options as option}
					<li
						class="cursor-pointer hover:dark:bg-spek-facade-600 rounded px-2 py-1"
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
