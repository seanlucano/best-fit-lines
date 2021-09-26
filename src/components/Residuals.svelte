<script>
    export let xScale;
    export let yScale;

    export let groupId = '';
    export let points = [];
    export let predict;
    export let highlightId;
    export let translating;
    

</script>


<g id={groupId}>
    {#each points as {x, y}, i}
        <line
            class:highlighted={i == highlightId}
            class:translated={translating}
            on:click
            x1={xScale(x)}
            y1={yScale(y)}
            x2={xScale(x)}
            y2={yScale(predict(x))}
            id={i}
        >
        </line>
    {/each}
</g>

<style>

    line {
        cursor: pointer;
        stroke-width: 2;
        opacity: .7;
        stroke-dasharray: 2,2;
    }

    .highlighted {
        opacity: 1; 
        stroke-width: 2.5;
    }

    #regressionLineResiduals .translated {
        transform: translate(1.5px, 0px);
        transition: transform, 0.5s;
    }

    #userLineResiduals .translated {
        transform: translate(-1.5px, 0px);
        transition: transform, 0.5s;
    }

</style>