<script>
    export let xScale;
    export let yScale;

    export let groupId = '';
    export let points = [];
    export let predict;

	const strokeWidth = 2;
    const strokeDasharray = '2,2'
    let stroke = 'grey';
    let opacity = 1;
    
    function highlight(event) {
        console.log(event);
    }

</script>


<g id={groupId}>
    {#each points as {x, y}, i}
        <line
            on:rollover={highlight}
            x1={xScale(x)}
            y1={yScale(y)}
            x2={xScale(x)}
            y2={yScale(predict(x))}
	        stroke-width={strokeWidth}
            stroke-dasharray={strokeDasharray}
            {stroke}
            {opacity}
            id={i}
        >
        </line>
    {/each}
</g>