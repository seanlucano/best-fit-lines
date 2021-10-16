<script>
	export let cx = 0;
	export let cy = 0;
	export let id;
	export let highlightId;
	export let showHighlighting;
	
	let  r = 8;
	let fill = 'grey';

</script>

<circle 
	on:click
	data-tooltip='{cx},{cy}'
	{r} 
	{cx}
	{cy}
	{id}
	class:highlighted={id == highlightId}
	class:clickable={showHighlighting}
></circle>

<style>
	
	
	circle {
		fill-opacity: .5;
		stroke-opacity: 0;
		fill: grey;
		stroke: black;
		stroke-width: 2px;
		transition: fill 300ms, fill-opacity 300ms, r 300ms;
		
	}

	.clickable {
		cursor: pointer;
	}

	.highlighted {
		fill-opacity: 0;
		stroke-opacity: 1;
		fill: black;
		/* r: 10px; */
	}
	
</style>