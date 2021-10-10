<script>
    export let xScale;
    export let yScale;
    export let groupId;
    export let predict;
    export let highlightId;
    export let translating;
    export let points;

    let offset = 25;

   $: if (groupId === 'userLineResidual') {
       offset *= -1;
   }
    
</script>



<g id={groupId}>
    {#each points as {x, y}, i}
        <line
            id={i}
            class:translated={translating}
            class:hidden={i != highlightId}
            on:click
            x1={xScale(x)}
            y1={yScale(y)}
            x2={xScale(x)}
            y2={yScale(predict(x))}
        >
        </line>
        <text
            id={i}
            class:translated={translating}
            class:hidden={i != highlightId}
            text-anchor='middle'
            x={xScale(x) + offset}
            y={yScale( (y + predict(x))/2  )} 
        >{(y - predict(x)).toFixed(2)}</text>
    {/each}
</g>

<style>

    line {
        stroke-width: 2;
        stroke-dasharray: 2,2;   
        opacity: 1;
        transition: opacity, .5s;
    }
    
    text {
        font-size: 1em;
        opacity: 1;
        transition: opacity, .5s;
    }

    .hidden {
        opacity: 0;
        visibility: hidden;
    }

    #regressionLineResidual .translated {
        transform: translate(2.5px, 0px);
        transition: transform, 0.5s;
    }

    #userLineResidual .translated {
        transform: translate(-2.5px, 0px);
        transition: transform, 0.5s;
    }

</style>