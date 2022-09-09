<script lang="ts">
	import { page } from '$lib/table/stores/page';
	import { repository } from '$lib/table/stores/repository';
	import { onDestroy } from 'svelte';

	import Left from '$lib/icon/Left.svelte';
	import Right from '$lib/icon/Right.svelte';

	const maxPageCount = 9;

	let disablePrevious = false;
	let disableNext = false;
	let pageCount = Math.ceil($repository.total / $page.take);
	let pageNumber = $page.skip / $page.take;

	let visiblePageNumbers: number[];

	function getVisiblePageNumbers(): number[] {
		if (pageCount <= maxPageCount) {
			return [...Array(pageCount).keys()];
		}

		const pageNumbers = new Set<number>();

		// Display the first and last two pages.
		pageNumbers.add(0);
		pageNumbers.add(1);

		pageNumbers.add(pageCount - 2);
		pageNumbers.add(pageCount - 1);

		// Display the surrounding two pages.
		pageNumbers.add(pageNumber - 1);
		pageNumbers.add(pageNumber);
		pageNumbers.add(pageNumber + 1);

		// Pad out the first few pages
		if (pageNumber < 3) {
			pageNumbers.add(2);
			pageNumbers.add(3);
			pageNumbers.add(4);
		}

		// Pad out the last few pages.
		if (pageNumber > pageCount - 4) {
			pageNumbers.add(pageCount - 5);
			pageNumbers.add(pageCount - 4);
			pageNumbers.add(pageCount - 3);
		}

		return Array.from(pageNumbers);
	}

	function truncatePageNumbers(pageNumbers: number[]): number[] {
		const truncatedPageNumbers: number[] = [];

		let n = 0;

		for (var i = 0; i < pageNumbers.length; i++) {
			const m = pageNumbers[i];

			if (n !== m) {
				truncatedPageNumbers.push(NaN);
				n = m;
			}

			truncatedPageNumbers.push(m);
			n++;
		}

		return truncatedPageNumbers;
	}

	function getPageNumbers(): number[] {
		const pageNumbers = getVisiblePageNumbers();

		const validPageNumbers = pageNumbers.filter((n) => {
			return n > -1 && n < pageCount;
		});

		const orderedPageNumbers = validPageNumbers.sort((n, m) => n - m);

		const truncatedPageNumbers = truncatePageNumbers(orderedPageNumbers);

		return truncatedPageNumbers;
	}

	const unsubscribe = repository.subscribe((data) => {
		disablePrevious = $page.skip === 0;
		disableNext = $page.skip + $page.take >= data.total;
		pageCount = Math.ceil(data.total / $page.take);
		pageNumber = $page.skip / $page.take;
		visiblePageNumbers = getPageNumbers();
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

	{#each visiblePageNumbers as n}
		<button
			class="p-1 hover:bg-skin-button-ring-hover disabled:hover:bg-inherit"
			class:bg-skin-button-ring-hover={n === pageNumber}
			disabled={isNaN(n)}
			on:click={() => page.set(n)}
		>
			<div class="px-2">{isNaN(n) ? '…' : n + 1}</div>
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
