import type { FilterState, FilterValue } from '$lib/table/types';
import type { Writable } from 'svelte/store';

import { writable } from 'svelte/store';

function create() {
	const store: Writable<FilterState> = writable({
		filters: []
	});

	const { subscribe } = store;

	function add(key: string, value: string) {
		store.update((state) => {
			const filter: FilterValue = { key, value };

			const result: FilterState = {
				filters: [...state.filters, filter]
			};

			return result;
		});
	}

	function clear() {
		store.set({
			filters: []
		});
	}

	return {
		subscribe,
		add,
		clear
	};
}

export const filter = create();
