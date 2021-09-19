<script>
	
	import Button from '../shared/Button.svelte'

	import { sequence, counter } from '../stores/sequence.js'

</script>

<section>
	{#if $counter > 0}
		<Button on:click={() => $counter -=1} color='white'> &lt Back</Button>
	{/if}

	{#if $counter < sequence.length - 1}
		<Button on:click={() => $counter +=1} color='black'>Next &gt</Button>
	{/if}
</section>


<style>

section {
	display: flex;
	justify-content: center;
	gap: .5em;
}

	
	
</style>

