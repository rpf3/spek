<script lang="ts">
	import type { ColorMode, FillMode, ButtonType } from '$lib/types';

	import { COLOR_MODE, FILL_MODE, BUTTON_TYPE } from '$lib/types';

	export let type: ButtonType = BUTTON_TYPE.BUTTON;
	export let color: ColorMode;
	export let fill: FillMode;
	export let disabled = false;
</script>

<button
	{disabled}
	type={type === BUTTON_TYPE.SUBMIT ? 'submit' : 'button'}
	on:click
	class="w-full rounded-md border px-4 py-2 focus:outline-none"
	class:bg-transparent={fill === FILL_MODE.RING}
	class:bg-spek-primary-600={fill === FILL_MODE.FILL && color === COLOR_MODE.PRIMARY}
	class:hover:bg-spek-primary-500={fill === FILL_MODE.FILL &&
		color === COLOR_MODE.PRIMARY &&
		disabled === false}
	class:bg-spek-accent-600={fill === FILL_MODE.FILL && color === COLOR_MODE.ACCENT}
	class:hover:bg-spek-accent-500={fill === FILL_MODE.FILL &&
		color === COLOR_MODE.ACCENT &&
		disabled === false}
	class:border-transparent={fill === FILL_MODE.FILL}
	class:border-spek-primary-600={fill === FILL_MODE.RING && color === COLOR_MODE.PRIMARY}
	class:hover:border-spek-primary-500={fill === FILL_MODE.RING &&
		color === COLOR_MODE.PRIMARY &&
		disabled === false}
	class:border-spek-accent-600={fill === FILL_MODE.RING && color === COLOR_MODE.ACCENT}
	class:hover:border-spek-accent-500={fill === FILL_MODE.RING &&
		color === COLOR_MODE.ACCENT &&
		disabled === false}
	class:text-spek-inverted={fill === FILL_MODE.FILL}
	class:cursor-not-allowed={disabled === true}
>
	<slot />
</button>
