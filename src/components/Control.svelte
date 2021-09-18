<script>

import { createEventDispatcher } from 'svelte';
import { fly } from 'svelte/transition';

export let id='';
export let checked = false;
export let slope = 1;
export let yInt = 0;
export let color = 'primary';


const dispatch = createEventDispatcher();

function changed() {
    dispatch('changed', {
        checked: checked,
        node: this
    });
    console.log(checked);
}

</script>

<div class="card">
    <label class="switch">
        <input {id} type="checkbox" bind:checked={checked} on:change={changed}>
        <span class="slider {color}"></span>
    </label>
    <span class='title'>
    <slot></slot>
    </span>

    {#if checked}
      <span id='slope'>Slope: {slope.toFixed(2)}</span>
      <span id='yInt'>Y Intercept: {yInt.toFixed(2)}</span>
    {/if}
</div>

<style>

.card {
    background-color: white;
    margin-bottom: .5em;
    padding: 1em;
    box-shadow: 0 2px 7px lightgrey;
    border-radius: .5em;
}

.title {
    padding: .5em;
}
    /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 2.5em;
  height: 1.5em;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 34px;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 1em;
  width: 1em;
  left: 4px;
  bottom: 4px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .primary{
  background-color: var(--primary);
}

input:checked + .secondary {
  background-color: var(--secondary);
}

input:checked + .accent {
  background-color: var(--accent);
}

input:checked + .alert {
  background-color: var(--alert);
}


input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(1em);
  -ms-transform: translateX(1em);
  transform: translateX(1em);
}

</style>