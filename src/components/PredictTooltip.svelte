<script>

export let chartWidth;
export let x;
export let y;
export let showUserLine;
export let showRegressionLine;
export let userLinePredict;
export let bestFitLinePredict;
export let highlightId;

let highlighting = false;

$: userVal = userLinePredict(x).toFixed(2);
$: regVal = bestFitLinePredict(x).toFixed(2);
$: userDiff = (y - userVal).toFixed(2);
$: regDiff = (y - regVal).toFixed(2);

function highlight()  {
    highlighting = true;
    setTimeout(() => {
        highlighting = false;
    }, 1000);
}

$: highlightId, highlight();



</script>
    <!-- {#if x} -->
    <!-- <Card> -->
    <div>
        <p>A customer bought <span class:highlighted={highlighting}>{x}</span>donuts at a cost of<span class:highlighted={highlighting}>${y.toFixed(2)}</span></p>
        {#if showUserLine}
            <p><span class='user'>Your line</span> predicted a cost of <span class:highlighted={highlighting} class='user'>${userVal}</span>, yeilding a residual difference of <span class:highlighted={highlighting} class='user'>{userDiff}</span>.</p>
        {/if}
        {#if showRegressionLine}
            <p>The <span class='best-fit'>best fit line</span> predicted a cost of <span class:highlighted={highlighting} class='best-fit'>${regVal}</span>, yeilding a residual difference of <span class:highlighted={highlighting} class='best-fit'>{regDiff}</span>.</p>
        {/if}
    </div>
    <!-- </Card> -->
   <!-- {/if} -->
<style>
    
    p {
        margin: .5em;
    }

    span {
        font-weight: bold;
        background-color: white;
        padding: .2em;
        border-radius: 8px;
        transition: background-color .5s;
    }

    .user {
        color: var(--primary);
    }

    .best-fit {
        color: var(--secondary);
    }

    .highlighted {
        background-color: #DFEBF6;
        transition: background-color .5s;
    }

    

</style>