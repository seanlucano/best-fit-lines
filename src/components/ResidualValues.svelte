<script>
    
    import { points, member } from '../stores/data.js'
    
    export let predict;
    
  
    $: resValues = points[$member].map(point => point.y - predict(point.x));
    $: ssr = resValues.reduce((previous, current) => previous + Math.pow(current, 2));
    


    // $: ssr = getSquaredSums(resValues);
    
    // const getSquaredSums = (array) => {
    //     let sum = 0,
    //     i = array.length;
    //     while (i--) {
    //         sum += Math.pow(array[i], 2);
    //     }   
    //     return sum;
    // }

    

</script>

<ol>
    <!-- {#each points[$member] as point}
        <li>{(point.y - predict(point.x)).toFixed(1)}</li>
    {/each} -->

    {#each resValues as residual}
        <li>{residual.toFixed(1)}</li>
    {/each}
</ol>
<div> SSR: {ssr.toFixed(2)}</div>

<style>
    ol {
        display: flex;
        gap: .25em;
        justify-content: space-around;
        padding-inline-start: 0px;
    }

    ol li {
        list-style-type: none;
        padding: 0;
        margin: 0;
        
}

</style>