<script lang="ts">
	import '../app.css';
	import { hiraganaStore } from '../lib/data/api';

	const preloadPromises: Promise<unknown>[] = [hiraganaStore.init()];

	const preload = Promise.all(preloadPromises);
</script>

<div class="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-2/3 w-2/3">
	{#await preload}
		Loading...
	{:then}
		<div class="mx-8 my-2">
			<slot />
		</div>
	{/await}
</div>

<style>
</style>
