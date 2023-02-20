import { readJSON } from './read-json';
import { createStaticAsyncStore } from './static-async-store';

export const hiraganaStore = createStaticAsyncStore(() => readJSON('hiragana'));

export { readJSON, createStaticAsyncStore };
