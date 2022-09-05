<script lang="ts">
	import type { Column } from '$lib/types';
	import type { DataRow } from '$lib/types';

	import utils from '$lib/utils';

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
