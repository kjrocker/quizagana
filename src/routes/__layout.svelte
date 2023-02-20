<script lang="ts">
	import '../app.css';

	const preloadPromises: Promise<unknown>[] = [];

	const preload = Promise.all(preloadPromises);
</script>

{#await preload}
	Loading...
{:then}
	<div class="body mx-8 my-2">
		<slot />
	</div>
{/await}
