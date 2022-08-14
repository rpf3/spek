<script lang="ts">
	import type { Column } from '$lib/types';

	import Cell from './Cell.svelte';

	export let column: Column;
</script>

<Cell>
	<div class="font-semibold">
		{column.header}
	</div>
</Cell>
