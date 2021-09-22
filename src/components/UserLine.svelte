<script>
	import { onMount, onDestroy } from 'svelte';
	import userLineStore from '../stores/userLineStore.js'
	import { fade } from 'svelte/transition';

	export let xScale;
	export let yScale;
	export let svg;

	let r = 10;
	
	// boolean for knowing when to move the handles during drag events
	let dragging = false;
	// keeps track of which handle shoudl be moved
	let target;

	// mouse event handlers
	const handleMouseDown = (event) => {
		dragging = true;
		target = event.target.id;
	}

	const handleMouseMove = (event) => {
		if (dragging) {

			if (target === '1') {
				$userLineStore.x1 = xScale.invert(event.offsetX)
				$userLineStore.y1 = yScale.invert(event.offsetY);
			} else if (target === '2') {
				$userLineStore.x2 = xScale.invert(event.offsetX)
				$userLineStore.y2 = yScale.invert(event.offsetY);
			}
		}
	}

	const handleMouseUp = (event) => {
		dragging = false;
	}

</script>

<line transition:fade
	x1='{xScale($userLineStore.x1)}'
	y1='{yScale($userLineStore.y1)}'
	x2='{xScale($userLineStore.x2)}'
	y2='{yScale($userLineStore.y2)}'
></line>

<circle transition:fade
	id="1"
	on:mousedown={(e) => handleMouseDown(e)}
	cx='{xScale($userLineStore.x1)}'
	cy='{yScale($userLineStore.y1)}'
	{r}
	>
</circle>

<circle transition:fade
	id="2"
	on:mousedown={(e) => handleMouseDown(e)}
	cx='{xScale($userLineStore.x2)}'
	cy='{yScale($userLineStore.y2)}'
	{r}
	>
</circle>

<svelte:window
	on:mousemove={(e) => handleMouseMove(e)}
	on:mouseup={(e) => handleMouseUp(e)}
/>

<style>

	line {
		stroke: var(--primary);
		opacity: .6;
		stroke-width: 2px;
	}

	circle {
		stroke-width: 3px;
		fill: none;
		opacity: .6;
		stroke: var(--primary);
		cursor: move;
		transition-property: fill;
		transition-duration: 2s;
		transform: translate
	}

	circle:hover {
		fill: var(--primary);
	}

</style>