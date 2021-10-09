<script>

import { fade } from 'svelte/transition';
import Card from '../shared/Card.svelte';

export let chartWidth;
export let posX;
export let posY;
export let x;
export let y;
export let showUserLine;
export let showRegressionLine;
export let userLinePredict;
export let bestFitLinePredict;

$: userVal = userLinePredict(x).toFixed(2);
$: regVal = bestFitLinePredict(x).toFixed(2);
$: userDiff = (y - userVal).toFixed(2);
$: regDiff = (y - regVal).toFixed(2);


</script>
    {#if x}
    <Card>
        <div>
            <p>A customer bought <strong>{x}</strong> donuts at a cost of <strong>${y.toFixed(2)}<strong></p>
            {#if showUserLine}
                <p><span class='user'>Your line</span> predicted a cost of <span class='user'>${userVal}</span>, yeilding a residual difference of <span class='user'>{userDiff}</span>.</p>
            {/if}
            {#if showRegressionLine}
                <p>The <span class='best-fit'>best fit line</span> predicted a cost of <span class='best-fit'>${regVal}</span>, yeilding a residual difference of <span class='best-fit'>{regDiff}</span>.</p>
            {/if}
        </div>
    </Card>
   {/if}



<style>
    
    p {
        margin: .5em;
    }

    span {
        font-weight: bold;
    }

    .user {
        color: var(--primary);
    }

    .best-fit {
        color: var(--secondary);
    }

    

</style>