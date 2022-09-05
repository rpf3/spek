<script lang="ts">
	import type { Column } from '$lib/types';
	import type { DataRow } from '$lib/types';

	import utils from '$lib/utils';

	export let column: Column;
	export let row: DataRow;
</script>

<div class="overflow-hidden whitespace-nowrap text-ellipsis">
	{utils.getCellValue(row, column.key)}
</div>
