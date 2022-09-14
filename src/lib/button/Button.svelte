<script lang="ts">
	import { ButtonType, ButtonMode } from './types';
	import { createEventDispatcher } from 'svelte';

	export let type: ButtonType;
	export let mode: ButtonMode;

	const dispatch = createEventDispatcher();

	function dispatchEvent(event: Event) {
		dispatch(event.type);
	}
</script>

<button
	on:click={dispatchEvent}
	class="w-full rounded-md border px-4 py-2 focus:outline-none hover:brightness-125"
	class:bg-transparent={mode === ButtonMode.Ring}
	class:bg-spek-primary={mode === ButtonMode.Fill && type === ButtonType.Primary}
	class:bg-spek-accent={mode === ButtonMode.Fill && type === ButtonType.Accent}
	class:border-transparent={mode === ButtonMode.Fill}
	class:border-spek-primary={mode === ButtonMode.Ring && type === ButtonType.Primary}
	class:border-spek-accent={mode === ButtonMode.Ring && type === ButtonType.Accent}
	class:text-spek-inverted={mode === ButtonMode.Fill}
>
	<slot />
</button>
