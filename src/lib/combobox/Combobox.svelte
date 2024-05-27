<script lang="ts">
	import type { SelectOption, ComboboxValue } from '$lib/combobox/types';

	import MultiValueCombobox from '$lib/combobox/components/MultiValueCombobox.svelte';
	import MonoValueCombobox from '$lib/combobox/components/MonoValueCombobox.svelte';

	export let options: SelectOption[] = [];
	export let value: ComboboxValue;
</script>

{#if value.type === 'multi'}
	<MultiValueCombobox bind:value {options} on:search on:change />
{/if}

{#if value.type === 'mono'}
	<MonoValueCombobox bind:value {options} on:search on:change />
{/if}
