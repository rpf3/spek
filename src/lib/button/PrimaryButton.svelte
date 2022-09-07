<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function dispatchEvent(event: Event) {
		dispatch(event.type);
	}
</script>

<button
	on:click={dispatchEvent}
	class="w-full rounded-md border border-transparent px-4 py-2 text-skin-inverted bg-skin-button-primary hover:opacity-75 focus:outline-none"
>
	<slot />
</button>
