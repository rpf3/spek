<script lang="ts">
	import { ColorMode, FillMode } from '$lib/types';
	import { createEventDispatcher } from 'svelte';

	export let color: ColorMode;
	export let fill: FillMode;
	export let disabled = false;

	const dispatch = createEventDispatcher();

	function dispatchEvent(event: Event) {
		dispatch(event.type);
	}
</script>

<button
	{disabled}
	type="button"
	on:click={dispatchEvent}
	class="w-full rounded-md border px-4 py-2 focus:outline-none"
	class:bg-transparent={fill === FillMode.Ring}
	class:bg-spek-primary-600={fill === FillMode.Fill && color === ColorMode.Primary}
	class:hover:bg-spek-primary-500={fill === FillMode.Fill &&
		color === ColorMode.Primary &&
		disabled === false}
	class:bg-spek-accent-600={fill === FillMode.Fill && color === ColorMode.Accent}
	class:hover:bg-spek-accent-500={fill === FillMode.Fill &&
		color === ColorMode.Accent &&
		disabled === false}
	class:border-transparent={fill === FillMode.Fill}
	class:border-spek-primary-600={fill === FillMode.Ring && color === ColorMode.Primary}
	class:hover:border-spek-primary-500={fill === FillMode.Ring &&
		color === ColorMode.Primary &&
		disabled === false}
	class:border-spek-accent-600={fill === FillMode.Ring && color === ColorMode.Accent}
	class:hover:border-spek-accent-500={fill === FillMode.Ring &&
		color === ColorMode.Accent &&
		disabled === false}
	class:text-spek-inverted={fill === FillMode.Fill}
	class:cursor-not-allowed={disabled === true}
>
	<slot />
</button>
