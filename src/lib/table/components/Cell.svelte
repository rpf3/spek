<script lang="ts">
	import type { Column } from '$lib/table/types';

	export let column: Column;
</script>

<div class="flex flex-row col-span-{column.size ?? 1}">
	<slot />
</div>
