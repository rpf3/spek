import type { FilterState } from '$lib/types';
import type { Writable } from 'svelte/store';

import { writable } from 'svelte/store';

export const filter: Writable<FilterState> = writable();
