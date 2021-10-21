<script>

	import userLineStore from '../stores/userLineStore.js'
	import { fade } from 'svelte/transition';

	export let xScale;
	export let yScale;
	export let svg;

	let r = 15;

	// create line endpoints
	$: y = $userLineStore.intercept();
	$: yy = $userLineStore.slope() * 20 + $userLineStore.intercept();

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
				if (xScale.invert(event.offsetX) > 0 && xScale.invert(event.offsetX) < 20) {
					$userLineStore.x1 = xScale.invert(event.offsetX)
				}
				if (yScale.invert(event.offsetY) > 0 && yScale.invert(event.offsetY) < 15) {
					$userLineStore.y1 = yScale.invert(event.offsetY);
				}
			} else if (target === '2') {
				if (xScale.invert(event.offsetX) > 0 && xScale.invert(event.offsetX) < 20) {
					$userLineStore.x2 = xScale.invert(event.offsetX)
				}
				if (yScale.invert(event.offsetY) > 0 && yScale.invert(event.offsetY) < 15) {	
					$userLineStore.y2 = yScale.invert(event.offsetY);
				}
			}		
		}
	}

	const handleMouseUp = (event) => {
		dragging = false;
	}

	// ensure handles do not leave chart


</script>

<line transition:fade
	x1='{xScale(0)}'
	y1='{yScale(y)}'
	x2='{xScale(20)}'
	y2='{yScale(yy)}'
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
		opacity: 1;
		stroke-width: 2px;
		z-index: 0;
	}

	circle {
		fill-opacity:.25;
		stroke-width: 2px;
		stroke-opacity: .5;
		fill: var(--primary);
		stroke: var(--primary);
		cursor: move;
		z-index: 1;
		transition: stroke-width .5s, fill-opacity .5s;
	}

	circle:hover {
		fill-opacity: .5;
	}

	circle:active {
		fill: var(--primary);
		stroke-width: 8px;
		stroke: black;
	}

</style>