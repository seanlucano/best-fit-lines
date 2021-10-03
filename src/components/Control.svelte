<script>

import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';

import ResidualValues from './ResidualValues.svelte';
import Card from '../shared/Card.svelte';
import Switch from '../shared/Switch.svelte';

export let showResValues;
export let color ='primary';
export let id='';
export let showResidualControls = false;
export let slope = 1;
export let yInt = 0;
export let lineChecked = false;
export let resChecked = false;

let resDisabled = false;

$: if (!lineChecked) {
  resChecked = false;
}

</script>

<Card>
  <section class='lineControls'>
    <Switch bind:checked={lineChecked} {color}/>
    <span class='title'>
      <slot></slot>
    </span>

    {#if lineChecked}
      <span id='lineFormula' class={color} >y = <strong>{slope.toFixed(2)}</strong>x + <strong>{yInt.toFixed(2)}</strong></span>
    {/if}
  </section>
    
  <section class='resControls'>
    {#if showResidualControls}
      <Switch disabled={!lineChecked} bind:checked={resChecked} {color} />
      <span class='title'>Residuals</span>
    {/if}
  </section>
</Card>

<style>


section {
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
}






</style>
