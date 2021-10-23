<script>
	import { fade, slide, scale, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Button from '../shared/Button.svelte';
	import { sequence, counter } from '../stores/sequence.js';

	export let title = '';
	export let prompt = '';
	export let cta = '';

	export let correct = 0;
	export let questions = [];
	export let feedback = '';
	export let showFeedback = false;

	let userChoice;
	let showSubmit = true;

	$:{ if (!showFeedback) {
		userChoice = undefined;
		showSubmit = true;
		}
	}

	function onSubmit() {
		showSubmit = false;
		showFeedback = true;
		console.log('showSubmit'+showSubmit);
		console.log('showFeedback'+showFeedback);
	}

</script>
<svelte:head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
	  rel="stylesheet">
	  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
      rel="stylesheet">
</svelte:head>

{#key $counter}
	<div id='title' in:fade>
		<h2>{title}</h2>
	</div>
	<div in:fade id='text'>
		{@html prompt}	
	</div>
	<div in:fade id='cta'>
		<i class="material-icons-round">
			ads_click
		</i>
		{@html cta}
		<div id='quiz'>
			{#if sequence[$counter].quiz}
				<form on:submit|preventDefault={onSubmit}>
					{#each questions as question, i}
						<label> 
							{#if showFeedback}
								{#if i == correct}
									<i 
									class='feedbackIcon material-icons-outlined
									correct'>
									check
									</i>
								{:else if i == userChoice && i != correct}
									<i 
									class='feedbackIcon material-icons-outlined
									incorrect'>
									close
									</i>
								{/if}
							{/if}
							<input bind:group={userChoice} name='quiz' type='radio' value='{i}'>
								{question}
						</label>
					{/each}
					<div class='submit'>
						{#if showSubmit}
							<Button type='submit' color='white'>Submit</Button>
						{/if}
					</div>
					{#if showFeedback}
						<div in:fade class='feedback'>
							{@html feedback}
						</div>
					{/if}
				</form>
			{/if}
		</div>	
	</div>
	
{/key}

<style>
	#text, #cta, #quiz, #title {
		margin: 1em;
	}

	#cta {
		margin-top: 1.5em;
		padding: .75em 1.35em;
		background-color:#DFEBF6;
		border-radius: .5em;
		box-shadow: 0 2px 7px lightgrey;
		position: relative;
	}

	strong {
		color: var(--heading);
	}

	#quiz label {
		margin-bottom: .5em;
		padding-left: .7em;
		position: relative;
	}

	input {
		border: 0;
		cursor: pointer;
		border-radius: 5px;
		padding: .5em 1em;
		font-weight: bold;
		background: var(--primary);
		color: white;
		box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
	}

	.submit, .feedback {
		margin-top: 1em;
		text-align: center;
	}

	.feedback {
		color: var(--heading);
	}

	.correct {
		color: green;
		position: absolute;
		top: -.15em;
		left: -.4em;
	}

	.incorrect {
		color: red;
		position: absolute;
		bottom: 0em;
		left: -.4em;
	}

	.material-icons-round {
		font-size: 1.75em;
		padding: 3px;
		position: absolute;
		background: white;
		border-radius: 50%;
		top: -5px;
		left: -5px;
		color: var(--emphasis);
    }
	
</style>
	