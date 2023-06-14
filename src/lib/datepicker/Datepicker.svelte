<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let name = '';

	const dispatch = createEventDispatcher();

	function dispatchEvent(event: Event) {
		dispatch(event.type);
	}
</script>

<input
	{name}
	type="date"
	bind:value
	on:change={dispatchEvent}
	class="text-sm bg-spek-facade-50 dark:bg-spek-facade-500 border dark:border-transparent rounded w-full p-1 focus:outline-spek-primary-400 outline-none outline-offset-0"
/>
