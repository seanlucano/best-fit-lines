<script>

import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';

import Card from '../shared/Card.svelte';
import Switch from '../shared/Switch.svelte';

export let showResValues;

export let id='';
export let checked = false;
export let resChecked = false;
export let showResidualControls = false;
export let color ='primary';
export let slope = 1;
export let yInt = 0;

let resDisabled = false;

$: if (!checked) {
  resChecked = false;
}

</script>

<Card>
  <section class='lineControls'>
    <Switch bind:checked={checked} {id} {color}/>
    <span class='title'>
      <slot></slot>
    </span>

    {#if checked}
      <span id='slope' class={color} >Slope: <strong>{slope.toFixed(2)}</strong></span>
      <span id='yInt' class={color}>Y-Intercept: <strong>{yInt.toFixed(2)}</strong></span>
    {/if}
  </section>
    
  <section class='resControls'>
    {#if showResidualControls}
      <Switch disabled={!checked} bind:checked={resChecked} {id} {color} />
      <span class='title'>Residuals</span>
      {#if showResValues}
        <span class='resValues'>0 1 2 3 4 5 6 7 8 0 10 11</span>
      {/if}
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