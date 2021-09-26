<script>
	export let cx = 0;
	export let cy = 0;
	export let id;
	export let highlightId;
	
	let  r = 8;
	let fill = 'grey';

</script>

<circle 
	on:click
	data-tooltip='hellooooo'
	{r} 
	{cx}
	{cy}
	{id}
	class:highlighted={id == highlightId}
></circle>

<style>
	
	
	circle {
		fill-opacity: .5;
		fill: grey;
		transition: fill 300ms, fill-opacity 300ms;
	}

	.highlighted {
		fill-opacity: .8;
		fill: black;
	}
	
</style>