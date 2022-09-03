import type { PageState } from '$lib/types';
import type { Writable } from 'svelte/store';

import { writable } from 'svelte/store';

export const page: Writable<PageState | null> = writable();
