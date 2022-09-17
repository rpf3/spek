<script lang="ts">
	import type { Column } from '$lib/table/types';

	import { filter } from '$lib/table/stores/filter';

	import Chip from '$lib/chip/Chip.svelte';
	import Menu from '$lib/menu/Menu.svelte';
	import Down from '$lib/icon/Down.svelte';
	import Trash from '$lib/icon/Trash.svelte';

	export let column: Column;

	let value: string;

	function handleChange() {
		filter.update(column.key, value);
	}
</script>

<Chip>
	<span class="font-semibold">{column.header}</span>

	<Menu>
		<button slot="toggle">
			<Down />
		</button>

		<div slot="content" class="flex gap-3 p-1">
			<button>
				<Trash />
			</button>

			<input
				type="text"
				bind:value
				on:change={handleChange}
				class="text-sm bg-spek-facade border rounded w-36 p-1"
			/>
		</div>
	</Menu>
</Chip>
