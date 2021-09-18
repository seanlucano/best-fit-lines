<script>
	export let color = 'primary';
	export let flat = false;
	export let disabled = false;
	export let type;
	
</script>


<button disabled={disabled} class={color} class:flat={flat} on:click|self>
<slot></slot>
</button>

<style>
	button {
		
		border: 0;
		cursor: pointer;
		border-radius: 5px;
		padding: .5em 1em;
		font-weight: bold;
		box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
	}
	
	.primary {
		background: var(--primary);
		color: white;
	}
	
	.secondary {
		background: var(--secondary);
		color: white;
	}

	.accent {
		background: var(--accent);
		color: white;
	}

	.black {
		background: black;
		color: white;
	}

	
	.white {
		background: white;

	}
	
	button:disabled {
		cursor: not-allowed;
		color: lightgrey;
		background: darkgrey
		
	}
		
	
</style>