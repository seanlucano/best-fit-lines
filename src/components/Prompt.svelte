<script>
	import { fade, slide, scale, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Button from '../shared/Button.svelte';
	import { sequence, counter } from '../stores/sequence.js';
	
	// export let counter;

	const dispatch = createEventDispatcher();
	
	let showSubmit = true;
	let showFeedback = false;

	let userChoice;
	let correct;

	function onSubmit() {
		showSubmit = false;
		showFeedback = true;
		//dispatch('proceed');
		//if (userChoice === sequence[counter].quiz.correct) {
		//} else {	
		//}
	}

	function onReset() {
		showSubmit = true;
		showFeedback = false;
		//dispatch('reset');
	}

</script>
<svelte:head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      rel="stylesheet">
</svelte:head>

{#key $counter}
	<div id='title' in:fade>
		<h2>{sequence[$counter].title}</h2>
	</div>
	<div in:fade id='text'>
		{@html sequence[$counter].prompt}	
	</div>
	<div in:fade id='cta'>
		<span class="material-icons-round">
			ads_click
			</span>
		{@html sequence[$counter].cta}
		<div id='quiz'>
			{#if sequence[$counter].quiz}
				<form on:submit|preventDefault={onSubmit}>
					{#each sequence[$counter].quiz.questions as question, i}
						<label> 
							<input bind:group={userChoice} name='quiz' type='radio' value='{i}'>
							{question}
						</label>
					{/each}
					<div class='submit'>
						{#if showSubmit}
							<Button type='submit' color='white'>Submit</Button>
						{/if}
					</div>
					<div class='feedback'>
						{#if showFeedback}
						{@html sequence[$counter].quiz.feedback}
							<!-- <Button 
							type='reset'
							on:click={onReset}
							_class='secondary'>Try again</Button> -->
						{/if}
					</div>
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
		position: relative;
	}

	strong {
		color: var(--heading);
	}

	#quiz label {
		margin-bottom: .5em;
		padding-left: .7em;
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
	