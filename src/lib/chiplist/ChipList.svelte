<script lang="ts">
	import type { SelectOption } from '$lib/combobox/types';
	import type { ChipListChangePayload } from '$lib/chiplist/types';

	import { COLOR_MODE, FILL_MODE } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	import Chip from '$lib/chip/Chip.svelte';
	import XCircle from '$lib/icon/XCircle.svelte';

	const dispatch = createEventDispatcher<{
		change: ChipListChangePayload;
	}>();

	export let value: SelectOption[] = [];

	function optionComparator(option1: SelectOption, option2: SelectOption) {
		return option1.value === option2.value;
	}

	function removeOption(option: SelectOption) {
		value = value.filter((s) => !optionComparator(s, option));

		dispatch('change', {
			value: value
		});
	}
</script>

{#if value.length > 0}
	<ul class="flex flex-wrap justify-start gap-1">
		{#each value as option}
			<Chip fill={FILL_MODE.RING} color={COLOR_MODE.PRIMARY}>
				<span>{option.text}</span>

				<button
					type="button"
					on:click={() => removeOption(option)}
					class="right-0 flex items-center text-spek-facade-400 dark:text-inherit"
				>
					<XCircle />
				</button>
			</Chip>
		{/each}
	</ul>
{/if}
