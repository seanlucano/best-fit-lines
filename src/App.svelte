<script>

	const colors = {
		primary:"#560bad", 
		secondary:"#10c2a7", 
		accent:"#ffa600",
		background:"#f0f3f5", 
		alert:"#fa5639"
	};
	
	import Prompt from './components/Prompt.svelte';
	import UserNav from './components/UserNav.svelte';
	import Chart from './components/Chart.svelte';
	import Header from './components/Header.svelte';
	import Footer from './components/Header.svelte';
	import ProgressBar from './components/ProgressBar.svelte';
	import { counter } from './stores/sequence.js'

	// let counter = 0;
	
	// LOGIC FOR THE COUNTER
	// advances/decremets the counter via clck events in UserNav
	// const navEvent = (event) => {
	// 	if (event.detail.type === 'next') $counter +=1;
	// 	if (event.detail.type === 'back') $counter -=1;
	// }
	// // sets counter via click events in ProgressBar
	// const setCounter = (event) => {
	// 	$counter = Number(event.target.id);
	// }

	// LOGIC FOR DISABLING ENABLING THE NEXT BUTTON
	// $: nextDisabled = sequence[counter].nextDisabled;
	// const proceed = () => {
	// 	nextDisabled = false;
	// }
	// const reset = () =>{
	// 	nextDisabled = true;
	// }


</script>

<Header />

<main>
	<ProgressBar 
		currentStep={$counter} 
		/>
	
	<section id='tutorial'>
		<div id='narrative'>
			<div id='prompt'>
				<Prompt 
					{$counter} 
					/>
			</div>
			<div id="userNav">
				<UserNav {$counter}/>
			</div>
		</div>
		
		<div id='interactive'>
			<Chart {$counter}/>
		</div>
	</section>
</main>



<style>

	:global(:root) {
	--background-color: #eff1f5;
	--primary: #7626D2;
	--secondary: #10c2a7;
	--accent: #ffa600;
	--alert: #fa5639;
	--black: #000;
	--header-height: 2em;
	}

	main {
		padding: 1em;
		height: calc(100vh - 5em);
	}

	#tutorial {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 1em;
		height: calc(100% - 4em);
	}

	#prompt {
		flex: 1;
		overflow: scroll;
	}

	#narrative {
		border: 2px solid lightgrey;
		border-radius: 5px;
		display: flex;
		gap: .5em;
		flex-direction: column;
		justify-content: space-between;
		min-width: 275px;
		
	}

	#userNav {
		margin: 0 1em 0 1em;
	}

	#interactive {
		height: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	

</style>