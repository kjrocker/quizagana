import { writable } from 'svelte/store';

export const guessStore = writable<[string, string][]>([]);
