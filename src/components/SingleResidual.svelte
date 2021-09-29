<script>
    export let xScale;
    export let yScale;
    export let groupId;
    export let predict;
    export let highlightId;
    export let translating;
    export let points;
    
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
    {/each}
</g>
<style>

    line {
            stroke-width: 0;
            opacity: 0;
            
        }

    .highlighted {
        opacity: 1; 
        stroke-width: 2.5;
        stroke-dasharray: 2,2;
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