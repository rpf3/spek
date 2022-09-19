<script lang="ts">
	import { ColorMode, FillMode } from '$lib/types';

	export let color: ColorMode;
	export let fill: FillMode;
</script>

<div
	class="flex gap-1 border items-center rounded-xl text-sm px-3 py-1"
	class:bg-transparent={fill === FillMode.Ring}
	class:bg-spek-primary-600={fill === FillMode.Fill && color === ColorMode.Primary}
	class:bg-spek-accent-600={fill === FillMode.Fill && color === ColorMode.Accent}
	class:border-transparent={fill === FillMode.Fill}
	class:border-spek-primary-600={fill === FillMode.Ring && color === ColorMode.Primary}
	class:border-spek-accent-600={fill === FillMode.Ring && color === ColorMode.Accent}
	class:text-spek-inverted={fill === FillMode.Fill}
>
	<slot />
</div>
