import type { DataSet } from '$lib/types';
import type { Writable } from 'svelte/store';

import { writable } from 'svelte/store';
import { createDataRows } from '$lib/utils/data';

function create() {
	const store: Writable<DataSet> = writable({
		rows: []
	});

	const { subscribe, set } = store;

	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	function init(data: any[]) {
		const rows = createDataRows(data);

		set({
			rows: rows
		});
	}

	return {
		subscribe,
		init
	};
}

export const dataset = create();
