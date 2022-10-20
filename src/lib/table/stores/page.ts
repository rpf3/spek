import type { PageState } from '$lib/table/types';
import type { Writable } from 'svelte/store';
import type { Config } from '$lib/table/types';

import { writable } from 'svelte/store';

function create() {
	const store: Writable<PageState> = writable();

	const { subscribe } = store;

	function init(config: Config) {
		if (config.pagination.enabled === false) {
			return;
		}

		store.set({
			skip: 0,
			take: config.pagination.size,
			number: 1
		});
	}

	function set(n: number) {
		store.update((state) => {
			return {
				skip: (n - 1) * state.take,
				take: state.take,
				number: n
			};
		});
	}

	function previous() {
		store.update((state) => {
			return {
				skip: state.skip - state.take,
				take: state.take,
				number: state.number - 1
			};
		});
	}

	function next() {
		store.update((state) => {
			return {
				skip: state.skip + state.take,
				take: state.take,
				number: state.number + 1
			};
		});
	}

	return {
		subscribe,
		set,
		init,
		previous,
		next
	};
}

export const page = create();
