<script lang="ts">
	import '../app.css';
	import { dataStore, hiraganaStore } from '../lib/data/api';

	const preloadPromises: Promise<unknown>[] = [hiraganaStore.init(), dataStore.init()];

	const preload = Promise.all(preloadPromises);
</script>

<div class="w-full h-screen flex content-start">
	{#await preload}
		Loading...
	{:then}
		<div class="w-full mx-8 my-2">
			<slot />
		</div>
	{/await}
</div>

<style>
</style>
