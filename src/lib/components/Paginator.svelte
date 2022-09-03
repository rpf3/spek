<script lang="ts">
	import { page } from '$lib/stores/page';

	import Left from './icons/Left.svelte';
	import Right from './icons/Right.svelte';

	function previousPage() {
		page.set({
			skip: $page.skip - $page.take,
			take: $page.take
		});
	}

	function nextPage() {
		page.set({
			skip: $page.skip + $page.take,
			take: $page.take
		});
	}
</script>

<div class="flex justify-center gap-1">
	<button class="border rounded p-1" on:click={previousPage}>
		<Left />
	</button>

	<button class="border rounded p-1" on:click={nextPage}>
		<Right />
	</button>
</div>
