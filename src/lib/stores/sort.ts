import type { SortState } from '$lib/types';
import type { Writable } from 'svelte/store';

import { SortDirection } from '$lib/types';
import { writable } from 'svelte/store';

function changeSortDirection(current: SortDirection) {
	if (current === SortDirection.None) {
		return SortDirection.Ascending;
	}

	if (current === SortDirection.Ascending) {
		return SortDirection.Descending;
	}

	return SortDirection.None;
}

function create() {
	const store: Writable<SortState> = writable();

	const { subscribe } = store;

	function set(key: string) {
		store.update((value) => {
			if (value?.key === key) {
				return {
					key: key,
					direction: changeSortDirection(value.direction)
				};
			}

			return {
				key: key,
				direction: SortDirection.Ascending
			};
		});
	}

	return {
		subscribe,
		set
	};
}

export const sort = create();
