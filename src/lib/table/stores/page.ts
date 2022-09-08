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
			take: config.pagination.size
		});
	}

	function set(n: number) {
		store.update((state) => {
			return {
				skip: n * state.take,
				take: state.take
			};
		});
	}

	function previous() {
		store.update((state) => {
			return {
				skip: state.skip - state.take,
				take: state.take
			};
		});
	}

	function next() {
		store.update((state) => {
			return {
				skip: state.skip + state.take,
				take: state.take
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
