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

{#key $counter}
	<div id='title' in:fade>
		<h2>{sequence[$counter].title}</h2>
	</div>
	<div in:fade id='text'>
		{@html sequence[$counter].prompt}	
	</div>
	<div in:fade id='cta'>
		{@html sequence[$counter].cta}	
	</div>
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
						<Button type='submit' color='accent'>Submit</Button>
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
{/key}

<style>
	#text, #cta, #quiz, #title {
		margin: 1em;
	}

	#cta {
		padding-top: .5em;
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
		margin-top: .7em;
		text-align: center;
	}

	.feedback {
		color: var(--accent);
	}
	
</style>
	