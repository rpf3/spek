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
		if (pageNumber < 4) {
			pageNumbers.add(2);
			pageNumbers.add(3);
			pageNumbers.add(4);
			pageNumbers.add(5);
		}

		// Pad out the last few pages.
		if (pageNumber > pageCount - 5) {
			pageNumbers.add(pageCount - 6);
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

<div class="flex gap-1">
	<button
		class="border rounded border-transparent hover:border-skin-button-primary disabled:hover:border-transparent min-w-[2rem] h-8"
		on:click={page.previous}
		disabled={disablePrevious}
	>
		<div class="flex justify-center">
			<Left />
		</div>
	</button>

	{#each visiblePageNumbers as n}
		<button
			class="border rounded border-transparent hover:border-skin-button-primary disabled:hover:border-transparent min-w-[2rem] h-8"
			class:bg-skin-button-primary={n === pageNumber}
			class:text-skin-inverted={n === pageNumber}
			disabled={isNaN(n)}
			on:click={() => page.set(n)}
		>
			<div>{isNaN(n) ? '…' : n + 1}</div>
		</button>
	{/each}

	<button
		class="border rounded border-transparent hover:border-skin-button-primary disabled:hover:border-transparent min-w-[2rem] h-8"
		on:click={page.next}
		disabled={disableNext}
	>
		<div class="flex justify-center">
			<Right />
		</div>
	</button>
</div>
