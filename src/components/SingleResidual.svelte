<script>
    export let xScale;
    export let yScale;
    export let groupId;
    export let predict;
    export let highlightId;
    export let translating;
    export let points;

    let offset = 15;

   $: if (groupId === 'userLineResiduals') {
       offset *= -1;
   }
    
</script>



<g id={groupId}>
    {#each points as {x, y}, i}
        <line
            id={groupId}
            class:translated={translating}
            class:highlighted={i == highlightId}
            on:click
            x1={xScale(x)}
            y1={yScale(y)}
            x2={xScale(x)}
            y2={yScale(predict(x))}
        >
        </line>
        <text
            class:translated={translating}
            class:highlighted={i == highlightId}
            text-anchor='middle'
            x={xScale(x) + offset}
            y={yScale( (y + predict(x))/2  )} 
        >{(y - predict(x)).toFixed(1)}</text>
    {/each}
</g>
<style>

    line {

        opacity: 0;
        stroke-width: 2.5;
        stroke-dasharray: 2,2;
            
        }
    
    text {
        font-size: .8em;
        opacity: 0;
    }

    .highlighted {
        opacity: 1; 
        
    }

    #regressionLineResiduals .translated {
        transform: translate(2.5px, 0px);
        transition: transform, 0.5s;
    }

    #userLineResiduals .translated {
        transform: translate(-2.5px, 0px);
        transition: transform, 0.5s;
    }

</style>