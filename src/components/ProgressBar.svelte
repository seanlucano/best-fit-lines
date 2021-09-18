<script>
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { scale } from 'svelte/transition';
import { createEventDispatcher } from 'svelte';

export let currentStep= 0;
export let steps = [];

const circleWidth = 20;

const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
});

$: $progress = (currentStep / (steps.length - 1));


</script>

<svelte:head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      rel="stylesheet">
</svelte:head>

<div id="progressBar">
    <ol>
        <progress value={$progress}></progress>
        {#each steps as step, i}
            <li on:click  id='{i}' class:completed={i < currentStep} class:current={i === currentStep} style='width:{circleWidth}px'>
                    {#if i < currentStep }
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
        padding: 1em 2em;
    }


    progress {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 4px;
        top: 40%;
        border: none;
        
        
    }

    progress::-webkit-progress-bar {
            background-color: darkgrey;
        }
  
    progress::-webkit-progress-value {
            background-color: var(--black)
        }

    
        
        




    ol {
        /* margin: 1em 4em; */
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

    li:hover {
        
    }

    
    

   



   

    /* li:after {
        content: "";
        top: 38%;
        width: calc(14.28% - 32px);
        height: 3px;
        background-color: darkgrey;
        position: absolute;
        z-index: -1;
        transition: .4s ease;
    } */

    /* .past:after {
        content: "";
        top: 38%;
        width: calc(14.28% - 32px);
        height: 3px;
        background-color: var(--seconday);
        position: absolute;
        z-index: 1;
        transition: .4s ease;
    } */


</style>