import { regressionLinear } from 'd3-regression';
import { derived} from 'svelte/store';

import points from './data.js';
import member from './member.js';

// linear regression accessors
const linearRegression = regressionLinear()
.x(d => d.x)
.y(d => d.y)
.domain([0, 20]);

const regressionLineStore = derived(member, $member => linearRegression(points[$member])); 

export default regressionLineStore;
