<script lang="ts">
	import { hiraganaStore } from '../lib/data/api';
	import { guessStore } from '../lib/data/stores';

	const sample = <T>(list: T[]): T => {
		return list[Math.floor(Math.random() * list.length)];
	};

	let list = $hiraganaStore.base;
	let current = list[0];
	let value = '';
	$: {
		if (value.toLowerCase() === current[1]) {
			setTimeout(() => {
				guessStore.update((v) => [...v, current]);
				value = '';
				current = sample(list);
			}, 100);
		}
	}
</script>

<div class="flex flex-col items-center cursor-none">
	<span class="text-[10rem]">{current[0]}</span><span class="text-2xl">{$guessStore.length}</span>
	<span class="">
		<label>
			What's this?
			<input
				type="text"
				name="guess"
				id="guess"
				class="shadow-sm dark:text-slate-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				bind:value
			/>
		</label>
	</span>
</div>
