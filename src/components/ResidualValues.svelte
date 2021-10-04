<script>
    
    import { points, member } from '../stores/data.js'
    export let predict;
    export let highlightId;
    
    $: resValues = points[$member].map(point => Math.pow( (point.y - predict(point.x)),2 ) );
    $: ssr = resValues.reduce((previous, current) => previous + current);

</script>

{#each resValues as residual, i}
    <span 
        id={i} 
        on:click 
        class:highlighted={i == highlightId}
        >
        {residual.toFixed(1)}
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
        
    }

    span {
        cursor: pointer;
        text-align: right;
        min-width: 35px;
        padding: 3px;
        border-radius: 5px;
        font-weight: normal;
        background-color: white;
        transition: backgorund-color 300ms, font-weight 300ms,
        
    }

</style>