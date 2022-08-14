<script lang="ts">
	import type { Column } from '$lib/types';

	import Cell from './Cell.svelte';

	export let column: Column;
</script>

<Cell>
	{column.header}
</Cell>
