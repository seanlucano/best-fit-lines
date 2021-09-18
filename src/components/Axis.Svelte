<script>
	export let axisType = 'xAxis';
	export let translate = 'translate(0, 0)';
	export let x = 0;
	export let x1 = 0;
	export let x2 = 0;
	export let y = 4;
	export let y1 = 0;
	export let y2 = 0;
	export let text = '';
</script>

{#if axisType == 'xAxis'}
<g class='tick' transform='{translate}'>
	<line y1='{y1}' y2='{y2}'/>
	<text y='{y}' style='font-size:14px;fill:#82828;text-anchor:middle;'>{text}</text>
</g>
{:else}
<g class='tick' transform='{translate}'>
	<line x1='{x1}' x2='{x2}'/>
	<text x='{x}' y='{y}' style='font-size:14px;fill:#82828;text-anchor:end;'>{text}</text>
</g>
{/if}


<style>
	.tick line {
		stroke: #a3a3a3;
		stroke-dasharray: 2;
		opacity: 0.6;
	}
</style>