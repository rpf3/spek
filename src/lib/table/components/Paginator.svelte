<script lang="ts">
	import { page } from '$lib/table/stores/page';
	import { repository } from '$lib/table/stores/repository';
	import { onDestroy } from 'svelte';

	import Left from '$lib/icon/Left.svelte';
	import Right from '$lib/icon/Right.svelte';

	let disablePrevious = false;
	let disableNext = false;
	let pageCount = Math.ceil($repository.total / $page.take);
	let pageNumber = $page.skip / $page.take;

	const unsubscribe = repository.subscribe((data) => {
		disablePrevious = $page.skip === 0;
		disableNext = $page.skip + $page.take >= data.total;
		pageCount = Math.ceil(data.total / $page.take);
		pageNumber = $page.skip / $page.take;
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

	{#each Array(pageCount) as _, i}
		<button
			class="p-1 hover:bg-skin-button-ring-hover disabled:hover:bg-inherit"
			class:bg-skin-button-ring-hover={i === pageNumber}
			on:click={() => page.set(i)}
		>
			<div class="px-2">{i + 1}</div>
		</button>
	{/each}

	<button
		class="p-1 hover:bg-skin-button-ring-hover disabled:hover:bg-inherit"
		on:click={page.next}
		disabled={disableNext}
	>
		<Right />
	</button>
</div>
