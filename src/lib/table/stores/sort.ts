import type { SortDirection } from '$lib/table/types';
import type { SortState } from '$lib/table/types';
import type { Writable } from 'svelte/store';

import { SORT_DIRECTION } from '$lib/table/types';
import { writable } from 'svelte/store';

function changeSortDirection(current: SortDirection) {
	if (current === SORT_DIRECTION.NONE) {
		return SORT_DIRECTION.ASCENDING;
	}

	if (current === SORT_DIRECTION.ASCENDING) {
		return SORT_DIRECTION.DESCENDING;
	}

	return SORT_DIRECTION.NONE;
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
				direction: SORT_DIRECTION.ASCENDING
			};
		});
	}

	return {
		subscribe,
		set
	};
}

export const sort = create();
