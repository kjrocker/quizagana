<script lang="ts">
</script>

<div class="base-timer">
	<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<g class="circle">
			<circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
			<path
				id="dash"
				class="dash-test"
				d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
			/>
		</g>
	</svg>
</div>

<style>
	.base-timer__svg {
		transform: scaleX(-1);
	}

	.circle {
		fill: none;
		stroke: none;
	}

	.base-timer__path-elapsed {
		transform: rotate(-90deg);
		transform-origin: center;
		stroke-width: 7px;
		stroke-dasharray: 283;
		stroke-dashoffset: 283;
		stroke: green;
		animation: dash 1s linear forwards;
	}

	@keyframes dash {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
