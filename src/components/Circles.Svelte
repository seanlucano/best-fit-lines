<script>
	export let cx = 0;
	export let cy = 0;
	export let id = '';
	
	let  r = 6;
	let fill = 'grey';
	let fillOpacity = 0.4;
	let stroke = 'rgba(0,0,0,0.5)';
	let strokeWidth = 1.5;
	

	function handleRollover() {
		opacity = 1;
		r = 7;
	}
</script>

<circle 
	data-tooltip='hellooooo'
	{r} 
	{cx}
	{cy}
	{fill}
	fill-opacity={fillOpacity}
	{stroke}
	stroke-width={strokeWidth}
	{id}
></circle>

