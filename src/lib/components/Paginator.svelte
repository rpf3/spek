<script lang="ts">
	import { page } from '$lib/stores/page';
	import { onDestroy } from 'svelte';

	import Left from './icons/Left.svelte';
	import Right from './icons/Right.svelte';

	let disablePrevious = false;

	const unsubscribe = page.subscribe((state) => {
		disablePrevious = state.skip === 0;
	});

	onDestroy(unsubscribe);
</script>

<div class="flex justify-center gap-1">
	<button class="border rounded p-1" on:click={page.previous} disabled={disablePrevious}>
		<Left />
	</button>

	<button class="border rounded p-1" on:click={page.next}>
		<Right />
	</button>
</div>
