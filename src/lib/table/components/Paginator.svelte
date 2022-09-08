<script lang="ts">
	import { page } from '$lib/table/stores/page';
	import { repository } from '$lib/table/stores/repository';
	import { onDestroy } from 'svelte';

	import Left from '$lib/icon/Left.svelte';
	import Right from '$lib/icon/Right.svelte';

	let disablePrevious = false;
	let disableNext = false;

	const unsubscribe = repository.subscribe((data) => {
		disablePrevious = $page.skip === 0;
		disableNext = $page.skip + $page.take >= data.total;
	});

	onDestroy(unsubscribe);
</script>

<div class="border rounded flex divide-x">
	<button
		class="p-1 hover:bg-skin-button-ring-hover disabled:hover:bg-inherit"
		on:click={page.previous}
		disabled={disablePrevious}
	>
		<Left />
	</button>

	<button
		class="p-1 hover:bg-skin-button-ring-hover disabled:hover:bg-inherit"
		on:click={page.next}
		disabled={disableNext}
	>
		<Right />
	</button>
</div>
