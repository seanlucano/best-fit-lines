<script>
	export let color = 'primary';
	export let disabled = false;
	export let type = '';
	
</script>


<button disabled={disabled} class={color} type={type} on:click|self>
<slot></slot>
</button>

<style>
	button {
		
		border: 0;
		cursor: pointer;
		border-radius: 5px;
		padding: .5em 1em;
		font-weight: bold;
		box-shadow: 0px 1px 6px 1px rgb(0 0 0 / 20%);
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