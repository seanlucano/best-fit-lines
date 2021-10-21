<script>
    export let xScale;
    export let yScale;
    export let groupId;
    export let predict;
    export let highlightId;
    export let translating;
    export let points;

    let offset;

   $: if (groupId === 'userLineResidual') {
       offset = -50;
   } else {
    offset = 15;
   }
    
</script>



<g id={groupId}>
    {#each points as {x, y}, i}
        <g class:translated={translating} class:hidden={i != highlightId}>
            <line
                id={i}
                on:click
                x1={xScale(x)}
                y1={yScale(y)}
                x2={xScale(x)}
                y2={yScale(predict(x))}
            >
            </line>
            <g transform='translate({(xScale(x)) + offset},{yScale((y + predict(x))/2)})'>
                <rect
                    transform='translate(-5,-20)'
                    class:hidden={i != highlightId}
                    width=50
                    height={30}
                    rx=8
                ></rect>
                <text
                    id={i}
                >{(y - predict(x)).toFixed(2)}</text>
            </g>
        </g>
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

    rect {
        fill: var(--background-color);
        fill-opacity: .85;
        stroke: none;
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