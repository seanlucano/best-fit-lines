import { regressionLinear } from 'd3-regression';
import { derived, readable } from 'svelte/store';

import { member, points } from './data.js';

// linear regression constructor
const linearRegression = regressionLinear()
.x(d => d.x)
.y(d => d.y)
.domain([0, 20]); 

//linear regression values
//returns an object that includes best fit line endpoints, slope, y-intercept, and a predict(x) return y function
export const regressionLineStore = derived(member, $member => linearRegression(points[$member])); 