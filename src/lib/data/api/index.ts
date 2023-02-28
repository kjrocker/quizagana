import { readCSV, readJSON } from './read-json';
import { createStaticAsyncStore } from './static-async-store';

export const hiraganaStore = createStaticAsyncStore(() => readJSON('hiragana'));
export const dataStore = createStaticAsyncStore(() => readCSV());

export { readJSON, createStaticAsyncStore };
