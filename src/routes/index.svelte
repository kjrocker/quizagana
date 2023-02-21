<script lang="ts">
	import Spinner from '../lib/components/base/spinner.svelte';
	import { hiraganaStore } from '../lib/data/api';
	import { guessStore } from '../lib/data/stores';
	import { makeArraySampler } from '../lib/util/array-sampler';

	let list = makeArraySampler($hiraganaStore.base);
	let current = list.next();
	let value = '';
	$: {
		if (value.toLowerCase() === current[1]) {
			setTimeout(() => {
				guessStore.update((v) => [...v, current]);
				value = '';
				current = list.next();
			}, 100);
		}
	}
</script>

<div class="flex flex-col items-center cursor-none">
	<span class="text-[10rem]">{current[0]}</span>
	<div class="">
		<div class="flex justify-between">
			<label for="guess" class="mr-4"> What's this?</label>
			<span>{$guessStore.length} so far</span>
		</div>
		<input
			type="text"
			name="guess"
			id="guess"
			class="shadow-sm dark:text-slate-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
			bind:value
		/>
	</div>
</div>
