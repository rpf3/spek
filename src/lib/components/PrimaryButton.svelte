<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function dispatchEvent(event: Event) {
		dispatch(event.type);
	}
</script>

<button
	on:click={dispatchEvent}
	class="w-full rounded-md border border-transparent px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-cyan-500 focus:ring-2 focus:ring-offset-2"
>
	<slot />
</button>
