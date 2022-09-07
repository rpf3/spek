<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function dispatchEvent(event: Event) {
		dispatch(event.type);
	}
</script>

<button
	on:click={dispatchEvent}
	class="w-full rounded-md border border-skin-button-secondary px-4 py-2 text-skin-base bg-skin-button-secondary hover:bg-skin-button-secondary-hover focus:outline-none"
>
	<slot />
</button>
