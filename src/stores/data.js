import { formatPrefix } from "d3";
import { writable } from 'svelte/store';

export const member = writable('a');

export const points = {
	a: [
		{ x: 4, y: 5 },
		{ x: 5, y: 8 },
		{ x: 6, y: 7 },
		{ x: 7, y: 5 },
		{ x: 8, y: 7 },
		{ x: 9, y: 9 },
		{ x: 10, y: 8 },
		{ x: 11, y: 8 },
		{ x: 12, y: 11 },
		{ x: 13, y: 8 },
		{ x: 14, y: 10 }
	],
	b: [
		{ x: 10, y: 9.14 },
		{ x: 8, y: 8.14 },
		{ x: 13, y: 8.74 },
		{ x: 9, y: 8.77 },
		{ x: 11, y: 9.26 },
		{ x: 14, y: 8.1 },
		{ x: 6, y: 6.13 },
		{ x: 4, y: 3.1 },
		{ x: 12, y: 9.13 },
		{ x: 7, y: 7.26 },
		{ x: 5, y: 4.74 }
	],
	c: [
		{ x: 10, y: 7.46 },
		{ x: 8, y: 6.77 },
		{ x: 13, y: 12.74 },
		{ x: 9, y: 7.11 },
		{ x: 11, y: 7.81 },
		{ x: 14, y: 8.84 },
		{ x: 6, y: 6.08 },
		{ x: 4, y: 5.39 },
		{ x: 12, y: 8.15 },
		{ x: 7, y: 6.42 },
		{ x: 5, y: 5.73 }
	],
	d: [
		{ x: 8, y: 6.58 },
		{ x: 8, y: 5.76 },
		{ x: 8, y: 7.71 },
		{ x: 8, y: 8.84 },
		{ x: 8, y: 8.47 },
		{ x: 8, y: 7.04 },
		{ x: 8, y: 5.25 },
		{ x: 19, y: 12.5 },
		{ x: 8, y: 5.56 },
		{ x: 8, y: 7.91 },
		{ x: 8, y: 6.89 }
	]
};
