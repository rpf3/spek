import type { PageState } from '$lib/types';
import type { Writable } from 'svelte/store';
import type { Config } from '$lib/types';

import { writable } from 'svelte/store';

function create() {
	const store: Writable<PageState | null> = writable();

	const { subscribe, set } = store;

	function init(config: Config) {
		if (config.pagination.enabled === false) {
			return;
		}

		set({
			skip: 0,
			take: config.pagination.size
		});
	}

	return {
		subscribe,
		set,
		init
	};
}

export const page = create();
