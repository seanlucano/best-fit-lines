<script>
	
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import { extent } from 'd3-array';
	import { regressionLinear } from 'd3-regression';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import * as easings from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	
	import { sequence, counter } from '../stores/sequence.js'
	import { member, points } from '../stores/data.js';
	import { regressionLineStore } from '../stores/regressionLineStore';
	import userLineStore from '../stores/userLineStore.js'

	import Circle from './Circle.svelte';
	import Axis from './Axis.svelte';
	import RegressionLine from './RegressionLine.svelte';
	import UserLine from './UserLine.svelte';
	import Control from './Control.svelte';
	import Residuals from './Residuals.svelte';
	import SingleResidual from './SingleResidual.svelte';
	import ResidualsTable from './ResidualsTable.svelte';
	import PredictTooltip from './PredictTooltip.svelte';
	import Card from '../shared/Card.svelte';


	
	// destructure store application state variables
	$:({ 
		showPoints, 
		showUserLine, 
		showRegressionLine, 
		showUserLineControls, 
		showRegressionLineControls,
		showResidualControls,
		showHighlighting,
		showSingleResidual,
		showPredictTooltip,
		showRegressionResiduals, 
		showUserResiduals,
		showResidualsTable} = sequence[$counter])

	// chart size
	let svg;
	let width = 600;
	let height = 400;
	
	$: console.log(width, height);

	// chart margin
	const margins = { top: 20, right: 25, bottom: 65, left: 50 };


	// MATHS
	// array range
	const [minX, maxX] = extent(points[$member],(d) => d.x);
	const [minY, maxY] = extent(points[$member],(d) => d.y);
	
	
	// scales
	$: xScale = scaleLinear()
		.domain([0, 16])
		.range([margins.left, width - margins.right]);

	$: yScale = scaleLinear()
		.domain([0, 14])
		.range([height - margins.bottom, margins.top]);

	// ticks
	$: xTicks = width > 360 ?
		[0, 2, 4, 6, 8, 10, 12, 14, 16] :
		[0, 4, 8, 16];

	$: yTicks = height > 180 ?
	[0, 2, 4, 6, 8, 10, 12, 14] :
		[0, 4, 8];


	// based on the user line, returns a y value for a given x value. Re-runs anytime userLineStore changes
	$: userLinePredict = function(x) { return $userLineStore.m * x + $userLineStore.b;}

	// responsiveness
	// const resize = () => {
	// 	({ width, height } = svg.getBoundingClientRect());
	// 	console.log(width, height);
	// }

	// onMount(() => resize() ); 

	// afterUpdate( () => resize() );
	
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

	// seperating residuals slightly when both lines are present 
	let translating = false;
	let singleTranslating = false;
	
	$: {
		if(showRegressionResiduals === true && showUserResiduals === true) {
			translating = true;
		} else {
			translating = false;
		}

		if (showSingleResidual && showUserLine && showRegressionLine) {
			singleTranslating = true;
		} else {
			singleTranslating = false;
		}
	}

	// highlighing related elements on click
	let highlightId;
	let clickedElement;
	const highlight = (event) => {
		if (showHighlighting) {
			highlightId = event.target.id;
			clickedElement = event.target;
		}
	}

	const removeHighlights = (event) => {
		highlightId = undefined;
	}

</script>

<!-- <svelte:window on:resize='{resize}'/> -->

<div id="controls">
	{#if showUserLineControls}
		<Control 
			id='yourLine' 
			slope={$userLineStore.slope()}
			yInt={$userLineStore.intercept()}
			bind:lineChecked={showUserLine} 
			bind:resChecked={showUserResiduals}
			showResidualControls={showResidualControls}
			showResValues={showUserResiduals}
			color='primary'>
			Your Line
		</Control>
	{/if}
	{#if showRegressionLineControls}
		<Control 
			id='regressionLine' 
			slope={$regressionLineStore.a}
			yInt={$regressionLineStore.b}
			bind:lineChecked={showRegressionLine} 
			bind:resChecked={showRegressionResiduals}
			showResidualControls={showResidualControls}
			showResValues={showRegressionResiduals}
			color='secondary'>
			Best Fit Line
		</Control>
	{/if}
</div>

{#if showResidualsTable}
	<div id='residualsTable'>	
		<ResidualsTable 
			on:click={highlight}
			{highlightId}
			{showRegressionResiduals}
			{showUserResiduals}
			userLinePredict={userLinePredict}
			bestFitLinePredict={$regressionLineStore.predict}
		/>	
	</div>
{/if}
{#if showPredictTooltip}
	<Card>
		{#if highlightId === undefined}
			<p style='background-color: #DFEBF6; padding: 1em;border-radius: 5px;'><strong>Click on any point to see an explanation of the the residual cost here.</strong></p>
		{:else}
			<PredictTooltip 
				{showUserLine}
				{showRegressionLine}
				userLinePredict={userLinePredict}
				bestFitLinePredict={$regressionLineStore.predict}
				{...points[$member][highlightId]} 
				{highlightId}
			/>
		{/if}
	</Card>
{/if}



<div bind:offsetWidth={width} bind:offsetHeight={height} id='chart'>
	
	<svg bind:this={svg} on:click|self={removeHighlights}>
		
		<g class='axis y-axis'>
			{#each yTicks as tick}
			<Axis axisType='yAxis' translate='translate(0, {yScale(tick)})' x1='{xScale(0)}' x2='{xScale(extent(xTicks)[1])}' x='{margins.left - 8}' y='+4' text={tick}></Axis>
			{/each}
			<text text-anchor='middle' transform='translate(20,{height/2 - 20}) rotate(-90)'
			>dollars<text>
		</g>

		
		<g class='axis x-axis'>
			{#each xTicks as tick}
			<Axis axisType='xAxis' translate='translate({xScale(tick)},0)' y1='{yScale(0)}' y2='{yScale(extent(yTicks)[1])}' y='{height - margins.bottom + 16}' text={tick}></Axis>
			{/each}
			<text style='text-anchor:middle;' x={width/2 + 10} y={height - margins.bottom/2 + 8}
			>donuts<text>
		</g>
		
		<g class='points'>
			{#if showPoints}
			
				{#each points[$member] as {x, y}, i}
					<Circle
						on:click={highlight}
						{showHighlighting}
						{highlightId}
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
						{translating}
						on:click={highlight} 
						{highlightId}
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
						{translating}
						on:click={highlight}
						{highlightId}
						groupId='userLineResiduals'
						{xScale} {yScale} 
						points={points[$member]} 
						predict={userLinePredict}   
					/>
				{/if}
			
				<UserLine {xScale} {yScale} {svg} />
	
			{/if}
		</g>
		<g class='singleResiduals'>
			{#if showSingleResidual}
				{#if showUserLine}
					<g class='userLine'>
						<SingleResidual
							translating={singleTranslating}
							on:click={highlight}
							{highlightId}
							groupId='userLineResidual'
							{xScale} {yScale} 
							points={points[$member]} 
							predict={userLinePredict}   
						/>
					</g>
				{/if}

				{#if showRegressionLine}
					<g class='regressionLine'>
						<SingleResidual
							translating={singleTranslating}
							on:click={highlight}
							{highlightId}
							groupId='regressionLineResidual'
							{xScale} {yScale} 
							points={points[$member]} 
							predict={$regressionLineStore.predict}   
						/>
					</g>
				{/if}
			
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
		/* max-width: 960px; */
		min-height: 350px;
		/* max-height: 1200px; */
		/* transition: flex 1s linear; */
        box-shadow: 0 2px 7px lightgrey;
        
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

	#residualsTable {
	}

	.regressionLine {
		stroke: var(--secondary);
		fill: var(--secondary);
	}

	.userLine {
		stroke: var(--primary);
		fill: var(--primary);
	}

</style>
