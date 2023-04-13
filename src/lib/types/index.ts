type ObjectValues<T> = T[keyof T];

export const COLOR_MODE = {
	PRIMARY: 'Primary',
	ACCENT: 'Accent'
} as const;

export type ColorMode = ObjectValues<typeof COLOR_MODE>;

export const FILL_MODE = {
	FILL: 'Fill',
	RING: 'Ring'
} as const;

export type FillMode = ObjectValues<typeof FILL_MODE>;
