<script lang="ts">
	import { page } from '$lib/stores/page';
	import { dataset } from '$lib/stores/dataset';
	import { onDestroy } from 'svelte';

	import Left from './icons/Left.svelte';
	import Right from './icons/Right.svelte';

	let disablePrevious = false;
	let disableNext = false;

	const unsubscribe = page.subscribe((state) => {
		disablePrevious = state.skip === 0;
		disableNext = state.skip + state.take >= $dataset.rows.length;
	});

	onDestroy(unsubscribe);
</script>

<div class="flex justify-center gap-1">
	<button
		class="border rounded p-1 hover:bg-skin-button-secondary-hover disabled:hover:bg-inherit"
		on:click={page.previous}
		disabled={disablePrevious}
	>
		<Left />
	</button>

	<button
		class="border rounded p-1 hover:bg-skin-button-secondary-hover disabled:hover:bg-inherit"
		on:click={page.next}
		disabled={disableNext}
	>
		<Right />
	</button>
</div>
