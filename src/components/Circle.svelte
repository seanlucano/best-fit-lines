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
		stroke: black;
		fill: grey;
		transition: fill .5s, stroke-opacity .5s;
	}

	.clickable {
		cursor: pointer;
	}

	.highlighted {
		fill-opacity: .8;
		fill: var(--interactive);
		stroke-opacity: .8;
		stroke-width: 2px;
		/* fill: black; */
		/* r: 10px; */
	}
	
</style>