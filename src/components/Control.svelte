<script>

import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';

import Card from '../shared/Card.svelte';
import Switch from '../shared/Switch.svelte';

export let id='';
export let checked = false;
export let color ='primary';
export let slope = 1;
export let yInt = 0;



const dispatch = createEventDispatcher();

// function changed() {
//     dispatch('changed', {
//         checked: checked,
//         node: this
//     });
// }

</script>

<Card>
  <Switch bind:checked={checked} {id} {color}/>
  <span class='title'>
    <slot></slot>
  </span>

  {#if checked}
    <span id='slope' class={color} >Slope: <strong>{slope.toFixed(2)}</strong></span>
    <span id='yInt' class={color}>Y Intercept: <strong>{yInt.toFixed(2)}</strong></span>
  {/if}
</Card>

<style>

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