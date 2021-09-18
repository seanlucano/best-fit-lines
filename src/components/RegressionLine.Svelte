<script>
	import regressionLineStore from '../stores/regressionLineStore';

	export let xScale;
	export let yScale;
	export let translate = 'translate(0,0)';
	export let strokeWidth = 2;
	export let strokeDasharray = '0'
	export let opacity = 0.8;

</script>

<line 
	transform={translate} 
	x1='{xScale($regressionLineStore[0][0])}' 
	x2='{xScale($regressionLineStore[1][0])}' 
	y1='{yScale($regressionLineStore[0][1])}' 
	y2='{yScale($regressionLineStore[1][1])}'
	stroke-width={strokeWidth}
	stroke-dasharray={strokeDasharray}
	opacity={opacity}
></line>