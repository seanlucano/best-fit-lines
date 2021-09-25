<script>

import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';
import { points, member } from '../stores/data.js';

import ResidualValues from './ResidualValues.svelte';
import Card from '../shared/Card.svelte';
import Switch from '../shared/Switch.svelte';


export let showRegressionResiduals;
export let showUserResiduals;
export let userLinePredict;
export let bestFitLinePredict;



</script>

<Card>
  <table>
      
    <tr id='head'> 
      <th>Point Index</th>
      {#each points[$member] as point, i}
        <th id={i}>{i}</th>
      {/each}
      <th>SSR</th>
    <tr>
    
    <tr id='user'>
      <td>Your Residuals</td>
      {#if showUserResiduals}
        <ResidualValues predict={userLinePredict}/>
      {/if}
    </tr>
    
    <tr id='bestFit'>
      <td>Best Fit Residuals</td>
      {#if showRegressionResiduals}
        <ResidualValues predict={bestFitLinePredict}/>
      {/if}
    </tr>

  </table>
</Card>

<style>


  table {
    width: 100%;
    border-collapse: collapse; 
  }

  th, tr {
    text-align: right;
  }

  tr {
    border-bottom: 1px solid lightgrey;
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