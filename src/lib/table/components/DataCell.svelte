<script lang="ts">
	import type { Column } from '$lib/table/types';
	import type { DataRow } from '$lib/table/types';

	import utils from '$lib/table/utils';

	export let column: Column;
	export let row: DataRow;
</script>

<div class="overflow-hidden whitespace-nowrap text-ellipsis">
	{utils.getCellValue(row, column.key)}
</div>
