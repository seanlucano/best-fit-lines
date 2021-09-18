<script>
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import { extent } from 'd3-array';
	import { regressionLinear } from 'd3-regression';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import * as easings from 'svelte/easing';
	import { fly } from 'svelte/transition';
	
	import points from '../stores/data.js';
	import member from '../stores/member.js';
	import regressionLineStore from '../stores/regressionLineStore';
	import userLineStore from '../stores/userLineStore.js'

	import Circles from './Circles.svelte';
	import Axis from './Axis.svelte';
	import RegressionLine from './RegressionLine.svelte';
	import UserLine from './UserLine.svelte';
	import Control from './Control.svelte';
	import Residuals from './Residuals.svelte';

	export let showPoints = false;
	export let showUserLine = false;
	export let showRegressionLine = false;
	export let focusPoints = false;
	
	export let showUserLineControls = false;
	export let showRegressionLineControls = false;

	export let showRegressionResiduals = true;
	export let showUserResiduals = true;
	export let showUserResidualLengths = false;
	export let showRegressionResidualLengths = false;
	
	//userNavLogic

	function controlToggle(event) {
		if (event.detail.node.id === 'yourLine') {
			showUserLine = !showUserLine;
		}

		if (event.detail.node.id === 'regressionLine') {
			showRegressionLine = !showRegressionLine
		}
	}

	// chart size
	let svg;
	let width = 600;
	let height = 400;
	

	// chart margin
	const margins = { top: 20, right: 20, bottom: 40, left: 25 };


	// MATHS
	// array range
	const [minX, maxX] = extent(points[$member],(d) => d.x);
	const [minY, maxY] = extent(points[$member],(d) => d.y);

	  
	// scales
	$: xScale = scaleLinear()
		.domain([0, 20])
		.range([margins.left, width - margins.right]);

	$: yScale = scaleLinear()
		.domain([0, 15])
		.range([height - margins.bottom, margins.top]);

	// ticks
	$: xTicks = width > 360 ?
		[0, 4, 8, 12, 16, 20] :
		[0, 10, 20];

	$: yTicks = height > 180 ?
		[0, 3, 6, 9, 12, 15] :
		[0, 5, 15];


	// a predict function for the userLine residuals

	$: userLinePredict = function(x) { return $userLineStore.m * x + $userLineStore.b;}

	// responsiveness

	onMount(resize);
	afterUpdate( () => {
		resize();
	});

	function resize() {
		({ width, height } = svg.getBoundingClientRect());
	}



	// changing datasets...will come back to this later

	//tweening function
	// const tweenedPoints = tweened(points, {
	// 	delay: 0,
	// 	duration: 750,
	// 	easing: easings.cubicOut
	// });

	// function setTween(key) {
	// 	tweenedPoints.set(data[key]);
	// }

	// $: setTween(member)

	
	
</script>

<svelte:window on:resize='{resize}'/>

<div id="controls">
	{#if showUserLineControls}
		<Control 
			id='yourLine' 
			slope={$userLineStore.slope()}
			yInt={$userLineStore.intercept()}
			checked={showUserLine} 
			on:changed={controlToggle}
			color='primary'>
			Your Line
		</Control>
	{/if}
	{#if showRegressionLineControls}
		<Control 
			id='regressionLine' 
			slope={$regressionLineStore.a}
			checked={showRegressionLine} 
			on:changed={controlToggle}
			color='secondary'>
			Best Fit Line
		</Control>
	{/if}
	
</div>
<div id='chart'>
	
	<svg bind:this={svg}>
		
		<g class='axis y-axis'>
			{#each yTicks as tick}
			<Axis axisType='yAxis' translate='translate(0, {yScale(tick)})' x1='{xScale(0)}' x2='{xScale(extent(xTicks)[1])}' x='{margins.left - 8}' y='+4' text={tick}></Axis>
			{/each}
		</g>

		
		<g class='axis x-axis'>
			{#each xTicks as tick}
			<Axis axisType='xAxis' translate='translate({xScale(tick)},0)' y1='{yScale(0)}' y2='{yScale(extent(yTicks)[1])}' y='{height - margins.bottom + 16}' text={tick}></Axis>
			{/each}
		</g>
		
		<g class='points'>
			{#if showPoints}
			
				{#each points[$member] as {x, y}, i}
					<Circle 
						cx={xScale(x)} 
						cy={yScale(y)} 
						id={i}
						>
					</Circle>
				{/each}
			{/if}
		</g>

		<g class='regressionLine'> 
			{#if showRegressionLine}
				{#if showRegressionResiduals}
					<Residuals 
						groupId='regressionLineResiduals'
						{xScale} {yScale} 
						points={points[$member]} 
						predict={$regressionLineStore.predict}   
					/>
				{/if}
				<RegressionLine {xScale} {yScale}/>
				
			{/if}
		</g>

		<g class='userLine'>
			{#if showUserLine}
				{#if showUserResiduals}
					<Residuals 
						groupId='userLineResiduals'
						{xScale} {yScale} 
						points={points[$member]} 
						predict={userLinePredict}   
					/>
				{/if}
				<UserLine {xScale} {yScale} {svg} />
			{/if}
		</g>
	
	</svg>
	
	<!-- <h3>Select quartet member:</h3>
	<div style='display:flex;'>
		
		{#each Object.keys(data) as player}
		<label style='margin:auto;'>
			<input on:change={(e)=> member = e.target.__value } type=radio bind:group={member} value={player}>
			{player.toUpperCase()}
		</label>
		{/each}

	</div>	 -->

</div>



<style>
	#chart {
		flex: 1;
		padding: .5em;
		background-color: white;
		border-radius: .5em;
		min-width: 300px;
		max-width: 960px;
		min-height: 350px;
		max-height: 800px;
		transition: flex 1s linear;
	}

	svg {
		width: 100%;
		height: 100%;
	}

	#controls {
		
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: .5em;

	}

	.regressionLine {
		stroke: var(--secondary);
	}
</style>
