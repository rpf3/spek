<script lang="ts">
	import type { SelectOption } from '$lib/types';

	import { createEventDispatcher } from 'svelte';
	import { COLOR_MODE, FILL_MODE } from '$lib/types';

	import Chip from '$lib/chip/Chip.svelte';
	import XCircle from '$lib/icon/XCircle.svelte';

	export let options: SelectOption[] = [];
	export let selected: SelectOption[] = [];

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

	function optionComparator(option1: SelectOption, option2: SelectOption) {
		return option1.value === option2.value;
	}

	function selectOption(option: SelectOption) {
		selected = [...selected, option];
		searchText = '';

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

	function deselectOption(option: SelectOption) {
		selected = selected.filter((s) => !optionComparator(s, option));
	}

	$: availableOptions = options.filter((option) => {
		return !selected.some((s) => optionComparator(s, option));
	});
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
			class="absolute bg-spek-facade-50 dark:bg-spek-facade-500 w-full mt-2 px-2 py-1 flex-col gap-2 rounded max-h-36 overflow-auto"
			class:hidden={isOpen === false}
			class:flex={isOpen === true}
		>
			{#if availableOptions.length > 0}
				{#each availableOptions as option}
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

	{#if selected.length > 0}
		<ul class="flex flex-wrap justify-start gap-1">
			{#each selected as option}
				<Chip fill={FILL_MODE.RING} color={COLOR_MODE.PRIMARY}>
					<span>{option.text}</span>

					<button
						type="button"
						on:click={() => deselectOption(option)}
						class="right-0 flex items-center text-spek-facade-400 dark:text-inherit"
					>
						<XCircle />
					</button>
				</Chip>
			{/each}
		</ul>
	{/if}
</div>
