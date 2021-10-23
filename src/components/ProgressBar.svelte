<script>
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { scale } from 'svelte/transition';
import { createEventDispatcher } from 'svelte';

import { sequence, counter } from '../stores/sequence.js'
export let currentStep= 0;

const steps = sequence;

const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
});

$: $progress = (currentStep / (steps.length - 1));

const circleWidth = 20;


const setCounter = (event) => {
		$counter = Number(event.target.id);
	}

</script>

<svelte:head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      rel="stylesheet">
</svelte:head>

<div id="progressBar">
    <ol>
        <progress value={$progress}></progress>
        {#each steps as step, i}
            <li on:click={setCounter}  id='{i}' class:completed={i < currentStep} class:current={i === currentStep} style='width:{circleWidth}px'>
                    {#if i <= currentStep }
                        <i transition:scale id={i} class="material-icons-round">done</i>
                    {/if}
            </li>
            
        {/each}
    </ol>

</div>

<style>

    /* @import '~material-design-icons/iconfont/material-icons.css'; */ 
    
    #progressBar {
        background-color: var(background-color);
        margin: 1em;
        padding: 1em;
    }


    progress {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 4px;
        top: 40%;
        border: none; 
        -webkit-appearance: none;
        appearance: none;
    }

    progress::-webkit-progress-bar {
            background-color: darkgrey;
        }
  
    progress::-webkit-progress-value {
            background-color: var(--black)
        }
    
    progress::-moz-progress-bar {
            background-color: var(--black)
        }

    
        
        




    ol {
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
        
    }

    li {
        cursor: pointer;
        height: 20px;
        border: 3px solid darkgrey;
        border-radius: 50%;
        background-color: white;
        
        
    }

    .completed {
        background-color: var(--black);
        border-color: var(--black);
        color: white;
    } 

    .current {
        color: var(--seconday);
        border-color: var(--black);

    }
    
    .material-icons-round {
        position: relative;
        font-size: 1.2em;
        font-weight: bold;
    }

</style>