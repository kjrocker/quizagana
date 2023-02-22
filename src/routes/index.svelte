<script lang="ts">
	import { hiraganaStore } from '../lib/data/api';
	import { guessStore } from '../lib/data/stores';
	import { makeArraySampler, sample } from '../lib/util/array-sampler';

	const getType = (): 'ROMA' | 'GANA' => 'GANA' || sample(['ROMA', 'GANA']);

	let list = makeArraySampler($hiraganaStore.base);
	let current = list.next();
	let currentType = getType();
	let currentOptions: [string, string][];
	let value = '';

	$: {
		if (value === '') {
			currentOptions = list.including(current);
		}
	}

	$: {
		console.log({ value });
	}

	$: {
		if (currentType === 'GANA' && value.toLowerCase() === current[1]) {
			setTimeout(() => {
				guessStore.update((v) => [...v, current]);
				value = '';
				current = list.next();
				currentType = getType();
			}, 100);
		} else if (currentType === 'ROMA' && value === current[1]) {
			setTimeout(() => {
				guessStore.update((v) => [...v, current]);
				value = '';
				current = list.next();
				currentType = getType();
			}, 100);
		}
	}
</script>

<div class="flex flex-col items-center">
	<span class="text-[10rem]">{currentType === 'GANA' ? current[0] : current[1].toUpperCase()}</span>
	<div class="">
		<div class="flex justify-between">
			<label for="guess" class="mr-4"> What's this?</label>
			<span>{$guessStore.length} so far</span>
		</div>
		{#if currentType === 'GANA'}
			<input
				type="text"
				name="guess"
				id="guess"
				class="shadow-sm dark:text-slate-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
				bind:value
			/>
		{:else}
			<div class="flex flex-row justify-between">
				{#each currentOptions as option}
					<label
						class="relative m-1 float-left border-2 border-blue-600 border-solid box-border flex-grow transition-colors ease-in-out hover:border-green-500"
					>
						<input
							type="radio"
							class="peer w-full h-full top-0 left-0 opacity-0 cursor-pointer absolute"
							name="guess"
							bind:group={value}
							value={option[1]}
						/>
						<div class="inner p-4 text-4xl peer-checked:bg-zinc-500">{option[0]}</div>
					</label>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	:root {
		--blue: #1e90ff;
		--borderColor: red;
		--white: #ffffff;
	}

	line {
		position: relative;
		border: 1px solid #03a9f3;
		width: 140px;
		height: 64px;
	}
	.line::before,
	.line::after {
		content: '';
		position: absolute;
		width: 20px;
		height: 20px;
	}

	line::before {
		top: -5px;
		left: -5px;
		border-top: 1px solid var(--borderColor);
		border-left: 1px solid var(--borderColor);
	}

	line::after {
		right: -5px;
		bottom: -5px;
		border-bottom: 1px solid var(--borderColor);
		border-right: 1px solid var(--borderColor);
	}

	line:hover::before,
	line:hover::after {
		width: calc(100% + 9px);
		height: calc(100% + 9px);
	}

	.rainbow {
		margin: auto;
		border-top: 5px solid;
		border-image: linear-gradient(0.25turn, lightgreen, 90%, red) 2;
		/* clip-path: inset(0px round 5px); */
		animation: huerotate 1s infinite linear;
		filter: hue-rotate(360deg);
	}

	@keyframes huerotate {
		0% {
			filter: hue-rotate(0deg);
		}
		100% {
			filter: hue-rorate(360deg);
		}
	}
</style>
