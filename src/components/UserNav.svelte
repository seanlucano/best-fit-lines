<script>
	
	import Button from '../shared/Button.svelte'
	import { createEventDispatcher } from 'svelte';
	
	export let counter;
	export let sequence;
	// export let nextDisabled = false;

	const dispatch = createEventDispatcher();

	function next() {
		
		dispatch('nav', {
			type: 'next'
		});
	}
	
	function back() {
		
		dispatch('nav', {
			type: 'back'
		});
	}
</script>

<section>
	{#if counter > 0}
		<Button on:click={back} color='white'> &lt Back</Button>
	{/if}

	{#if counter < sequence.length - 1}
		<Button on:click={next} color='black'>Next &gt</Button>
	{/if}
</section>


<style>

section {
	display: flex;
	justify-content: center;
	gap: .5em;
}

	
	
</style>

