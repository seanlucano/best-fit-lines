<script>
    
    import { points, member } from '../stores/data.js'
    export let predict;
    export let highlightId;
    
    $: resValues = points[$member].map(point => Math.pow( (point.y - predict(point.x)),2 ) );
    $: ssr = resValues.reduce((previous, current) => previous + current);

</script>

{#each resValues as residual, i}
    <span class='squaredResidual'
        id={i} 
        on:click 
        class:highlighted={i == highlightId}
        >
        {residual.toFixed(2)}
    </span>
{/each}
<span class='ssr'>{ssr.toFixed(2)}</span>


<style>
    .ssr {
        font-weight: bold;
        min-width: 60px;
    }

    .highlighted {
        font-weight: bold;
        background-color: var(--background-color);
        -webkit-transition: background-color 300ms linear;
        -ms-transition: background-color 300ms linear;
        transition: background-color 300ms linear;
        
    }

    span {
        text-align: right;
        min-width: 35px;
        max-width: 40px;
        padding: 3px; 
        border-radius: 5px;
        font-weight: normal;
        background-color: white;
        -webkit-transition: background-color 300ms linear;
        -ms-transition: background-color 300ms linear;
        transition: background-color 300ms linear; 
         
    }

    .squaredResidual {
        cursor: pointer;
    }

</style>