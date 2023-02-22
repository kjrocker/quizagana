<script lang="ts">
	export let name: string;
	export let group: string;
	export let value: any;
	export let disabled: boolean = false;
	export let text: string;
</script>

<label
	class="relative m-1 float-left border-2 border-blue-600 border-solid box-border flex-grow transition-colors ease-in-out hover:border-green-500"
>
	<input
		type="radio"
		class="input w-28 h-8 text-4xl"
		on:change
		on:blur
		on:focus
		{name}
		{group}
		{value}
		{disabled}
	/>
	<div class="inner text-4xl">{text}</div>
</label>

<style>
	.inner {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 25px;
		transition: 0.5s ease;
	}

	.input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.input[type='radio']:checked ~ .inner {
		background-color: #50bcf2;
	}
</style>
