<script>
    
    import { points, member } from '../stores/data.js'
    export let predict;
    
    $: resValues = points[$member].map(point => point.y - predict(point.x));
    $: ssr = resValues.reduce((previous, current) => previous + Math.pow(current, 2));

</script>

{#each resValues as residual, i}
    <td id={i}>{residual.toFixed(1)}</td>
{/each}
<td class='ssr'>{ssr.toFixed(2)}</td>


<style>
    .ssr {
        font-weight: bold;
    }
</style>