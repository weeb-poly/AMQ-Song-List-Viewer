import { writable, derived } from 'svelte/store';

export const importData = writable({});

export const playerNames = derived(
	importData,
	$importData => {
		let tmp = new Set();
		for (let song of importData) {
			song.players.forEach(tmp.add, tmp);
		}
		return tmp;
	}
);

export const engLang = writable(true);

export const animeTitleType = derived(
	engLang,
	$engLang => $engLang ? 'english' : 'romaji'
);
