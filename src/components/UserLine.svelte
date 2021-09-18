<script>
	import { onMount, onDestroy } from 'svelte';
	import userLineStore from '../stores/userLineStore.js'

	export let xScale;
	export let yScale;
	export let svg;

	
	let width = 15;
	let height = 15;
	let r = 10;
	
	// locally store userLine vales and destructure for rendering
	let userLine;
	$: ({x1, y1, x2, y2} = userLine);
	
	// subscribe and unsub to the userLine data store
	const unsub = userLineStore.subscribe(data => {
		userLine = data;
	});
	onDestroy( () => {
		unsub();
	});
	

	// boolean for knowing when to move the handles during drag events
	let dragging = false;
	// keeps track of which handle shoudl be moved
	let target;

	// mouse event handlers
	const handleMouseDown = (event) => {
		dragging = true;
		target = event.target.id;
		console.log('you clicked circle: ' + event.target.id)
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

<line  
	x1='{xScale(x1)}'
	y1='{yScale(y1)}'
	x2='{xScale(x2)}'
	y2='{yScale(y2)}'
></line>

<circle 
	id="1"
	on:mousedown={(e) => handleMouseDown(e)}
	cx='{xScale(x1)}'
	cy='{yScale(y1)}'
	{r}
	>
</circle>

<circle 
	id="2"
	on:mousedown={(e) => handleMouseDown(e)}
	cx='{xScale(x2)}'
	cy='{yScale(y2)}'
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