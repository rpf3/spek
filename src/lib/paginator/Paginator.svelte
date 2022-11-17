<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Left from '$lib/icon/Left.svelte';
	import Right from '$lib/icon/Right.svelte';

	export let count: number;
	export let current: number;

	const maxPageCount = 9;
	const dispatch = createEventDispatcher();

	function getVisiblePageNumbers(count: number, current: number): number[] {
		if (count <= maxPageCount) {
			return [...Array(count).keys()];
		}

		const pageNumbers = new Set<number>();

		// Display the first and last two pages.
		pageNumbers.add(1);
		pageNumbers.add(2);

		pageNumbers.add(count - 1);
		pageNumbers.add(count);

		// Display the surrounding two pages.
		pageNumbers.add(current - 1);
		pageNumbers.add(current);
		pageNumbers.add(current + 1);

		// Pad out the first few pages
		if (current < 5) {
			pageNumbers.add(3);
			pageNumbers.add(4);
			pageNumbers.add(5);
			pageNumbers.add(6);
		}

		// Pad out the last few pages.
		if (current > count - 4) {
			pageNumbers.add(count - 5);
			pageNumbers.add(count - 4);
			pageNumbers.add(count - 3);
			pageNumbers.add(count - 2);
		}

		return Array.from(pageNumbers);
	}

	function truncatePageNumbers(pageNumbers: number[]): number[] {
		const truncatedPageNumbers: number[] = [];

		let n = 1;

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

	function getPageNumbers(count: number, current: number): number[] {
		const pageNumbers = getVisiblePageNumbers(count, current);

		const validPageNumbers = pageNumbers.filter((n) => {
			return n > 0 && n <= count;
		});

		const orderedPageNumbers = validPageNumbers.sort((n, m) => n - m);

		const truncatedPageNumbers = truncatePageNumbers(orderedPageNumbers);

		return truncatedPageNumbers;
	}

	function previousHandler() {
		dispatch('previous');
	}

	function nextHandler() {
		dispatch('next');
	}

	function gotoHandler(pageNumber: number) {
		dispatch('goto', pageNumber);
	}

	$: disablePrevious = current === 1;
	$: disableNext = current === count;
	$: visiblePageNumbers = getPageNumbers(count, current);
</script>

<div class="flex gap-1">
	<button
		type="button"
		class="border rounded border-transparent hover:border-spek-primary-600 disabled:hover:border-transparent min-w-[2rem] h-8 disabled:opacity-50"
		on:click={previousHandler}
		disabled={disablePrevious}
	>
		<div class="flex justify-center">
			<Left />
		</div>
	</button>

	{#each visiblePageNumbers as n}
		<button
			type="button"
			class="hidden sm:block border rounded border-transparent hover:border-spek-primary-600 disabled:hover:border-transparent min-w-[2rem] h-8"
			class:bg-spek-primary-600={n === current}
			class:text-spek-inverted={n === current}
			disabled={isNaN(n)}
			on:click={() => gotoHandler(n)}
		>
			<div>{isNaN(n) ? '…' : n}</div>
		</button>
	{/each}

	<button
		type="button"
		class="border rounded border-transparent hover:border-spek-primary-600 disabled:hover:border-transparent min-w-[2rem] h-8 disabled:opacity-50"
		on:click={nextHandler}
		disabled={disableNext}
	>
		<div class="flex justify-center">
			<Right />
		</div>
	</button>
</div>
