<script lang="ts">
	import type { Column } from '$lib/table/types';
	import type { DataRow } from '$lib/table/types';

	import utils from '$lib/table/utils';

	import UserIcon from './UserIcon.svelte';

	export let column: Column;
	export let row: DataRow;

	function handleClick() {
		console.info(utils.getCellValue(row, column.key));
	}
</script>

<button on:click={handleClick}>
	<UserIcon />
</button>

<span class="ml-2">{utils.getCellValue(row, column.key)}</span>
