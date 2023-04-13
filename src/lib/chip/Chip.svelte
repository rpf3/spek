<script lang="ts">
	import type { ColorMode, FillMode } from '$lib/types';

	import { COLOR_MODE, FILL_MODE } from '$lib/types';

	export let color: ColorMode;
	export let fill: FillMode;
</script>

<div
	class="flex gap-1 border items-center rounded-xl text-sm px-3 py-1"
	class:bg-transparent={fill === FILL_MODE.RING}
	class:bg-spek-primary-600={fill === FILL_MODE.FILL && color === COLOR_MODE.PRIMARY}
	class:bg-spek-accent-600={fill === FILL_MODE.FILL && color === COLOR_MODE.ACCENT}
	class:border-transparent={fill === FILL_MODE.FILL}
	class:border-spek-primary-600={fill === FILL_MODE.RING && color === COLOR_MODE.PRIMARY}
	class:border-spek-accent-600={fill === FILL_MODE.RING && color === COLOR_MODE.ACCENT}
	class:text-spek-inverted={fill === FILL_MODE.FILL}
>
	<slot />
</div>
