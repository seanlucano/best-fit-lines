<script>

import { createEventDispatcher } from 'svelte';
import { fade } from 'svelte/transition';
import { points, member } from '../stores/data.js';

import ResidualValues from './ResidualValues.svelte';
import Card from '../shared/Card.svelte';
import Switch from '../shared/Switch.svelte';

export let highlightId;
export let showRegressionResiduals;
export let showUserResiduals;
export let userLinePredict;
export let bestFitLinePredict;



</script>

<Card>
    <div class='title'>
      <span>Squared Residuals</span> 
    <span>SSR</span></div>
    <div id='user' class="residualsRow">
      {#if showUserResiduals}
        <ResidualValues {highlightId} on:click predict={userLinePredict}/>
      {/if}
    </div>
  
    <div id='regression' class="residualsRow">
      {#if showRegressionResiduals}
        <ResidualValues {highlightId} on:click predict={bestFitLinePredict}/>
      {/if}
    </div>
  
</Card>

<style>

  .residualsRow {
    display: flex;
    justify-content: space-between; 
    padding: .25em;
  }

  #user {
    color: var(--primary);
  }

  #regression {
    color: var(--secondary);
  }

  .title {
    padding: .5em 1em .5em .5em;
    display: flex;
    justify-content: space-between;
  }

  




/* section {
  padding: .5em;
}

.title {
    padding: .5em;
}

.primary strong {
  color: var(--primary);
}

.secondary strong {
  color: var(--secondary);
}

.accent strong {
  color: var(--accent);
}

.alert strong {
  color: var(--alert);
} */






</style>