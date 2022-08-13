<script lang="ts">
	import type { Column } from '$lib/types';

	export let columns: Column[];
</script>

<div class="flex">
	<div class="flex flex-row gap-2">
		{#each columns as column}
			<div>{column.name}</div>
		{/each}
	</div>
</div>
