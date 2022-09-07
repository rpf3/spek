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
	class="w-full rounded-md border px-4 py-2 focus:outline-none"
	class:bg-transparent={mode === ButtonMode.Ring}
	class:bg-skin-button-primary={mode === ButtonMode.Fill && type === ButtonType.Primary}
	class:bg-skin-button-accent={mode === ButtonMode.Fill && type === ButtonType.Accent}
	class:border-transparent={mode === ButtonMode.Fill}
	class:border-skin-button-primary={mode === ButtonMode.Ring && type === ButtonType.Primary}
	class:border-skin-button-accent={mode === ButtonMode.Ring && type === ButtonType.Accent}
	class:text-skin-inverted={mode === ButtonMode.Fill}
	class:hover:opacity-75={mode === ButtonMode.Fill}
	class:hover:bg-skin-button-ring-hover={mode === ButtonMode.Ring}
>
	<slot />
</button>
