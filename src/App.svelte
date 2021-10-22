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
	import { sequence, counter } from './stores/sequence.js'

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



<main>
	<ProgressBar 
		currentStep={$counter} 
		/>
	
	<section id='tutorial'>
		<div id='narrative'>
			<div id='prompt'>
				<Prompt 
					{...sequence[$counter].quiz}
					{...sequence[$counter]}
				/>
			</div>
			<div id="userNav">
				<UserNav />
			</div>
		</div>
		
		<div id='interactive'>
			<Chart />
		</div>
	</section>
</main>



<style>

	:global(:root) {
	--background-color: #eff1f5;
	--secondary: hsl(248, 53%, 58%);
	--primary: hsl(333, 100%, 45%);
	--accent: #ffa600;
	--alert: hsl(333, 100%, 45%);
	--black: #000;
	--emphasis: #4433FF;
	--heading: #2C0B8E;
	--header-height: .5em;
	--interactive: #DFEBF6;
	}

	main {
		padding: 1em;
		height: calc(100vh - 5em);
	}

	#tutorial {
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 1em;
		height: calc(100% - 1em);
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
		min-width: 200px;
		background-color: white;

		
	}

	#userNav {
		margin:.5em;
	}


	#interactive {
		height: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	

</style>