import { writable } from 'svelte/store';

export const counter = writable(0);

export const sequence = [
    {	
        title: 'Welcome to best fit lines!',
        prompt: `<p>Imagine each circle you see represents a single sales transaction.</p>
        <p>Just for fun, let's say each transaction is for some (x) number of donuts for some (y) amount of US Dollars.</p>`,	
        cta: `<p><strong>What best describes the dollars to donuts relationship?</p>`,
        quiz: {
            questions: [`Positive`, `Negative `],
            correct: 0,
            feedback: `It's positive! As the number of donuts increases, so does transaction cost.`
        },	
        showPoints: true,
        showFeedback: false
        
    },
    {	
        title: 'Imagine a line',
        prompt:`<p>We know that these two variables have a positive relationship.  But what if we would like to be more specific?</p>
        <p>What if you wanted to be able to use all of this data from different transactions to <strong>predict</strong> the cost of a future transaction given the number of donuts purchased.</p>
        <p>That relationship could be expressed in the form of a <strong>line</stong>.</p>`,	
         cta: `<p><strong>Using the circle handles, try to place a line that would best express the dollars to donuts relationship.</strong></p><p>Click "Next" when you are happy with your line.</p>`,
         showPoints: true,
         showUserLine: true,
         showUserLineControls: true
    },
    {	
        title: 'Good line...best line',
        prompt:`<p>Nice job!  This seems like a very reasonable line!</p>  <p>But is it the... <strong>best possible fit</strong> for this data?</p>    
        <p>What if you knew that a line existed that would give you the best possible linear relationship between dollars and donuts?</p>`,
        cta: `<p><strong>Use the "Best Fit Line" switch in the upper right to reveal this mysterious line!<p></strong></p>`,
        	
        showPoints: true,
        showUserLineControls: true,
        showUserLine: true,
        showRegressionLineControls: true	
    },
    
    {	title: 'What makes a good "fit"',
        prompt:`<p>So we know that there is such a thing as a <strong>best fit</strong> line, but what makes this line so...best?  <p><strong>How do we know this new line is any better than the line you drew?</strong></p>
        <p>Here's one way to start thinking about what makes a line's fit good or bad: <strong>you need to be able to measure the distance between each data point and the line.</strong></p>`,	
        cta: `<p><strong>Click any point to reveal the distance between that point and the lines.</strong></p> <p> What do you think these distances represent?</p>`,
        quiz: {
            questions: [`The cost of a future transaction`, `The cost of an observed transaction`, `The difference between the observed and predicted costs`,],
            correct: 2,
            feedback: `Remember, points represent observed values, and the line represents a predicted value.  So the verticle distance between the two represents the difference between the (y) cost values for a given (x) number of donuts.`
        },	
        showPoints: true,
        showUserLine: true,
        showRegressionLine: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showHighlighting: true,
        showSingleResidual: true,
        showFeedback: false
        
    },
    {	title: 'Residuals',
        prompt:` <p>Each points tells us about an <strong>observed</strong> transaction.  Our line, on the other hand, is making a <strong>prediction</strong> about a future transaction. If you pick any number of donuts (x), the line will tell us what cost (y) to expect.</p>
        <p>The distance between the <strong>observed</strong> cost and the line's <strong>predicted</strong> cost is the <strong>residual</strong> (or error) value for the line at each point.</p>	
        `,
        cta: `<p><strong>Click on any point to see an explanation of the residual cost for each transaction.</strong></p>`,
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showUserLine: true,
        showHighlighting: true,
        showSingleResidual: true,
        showPredictTooltip: true
    },
    {	title: 'Minimizing residuals',
        prompt: `<p>If you want your line to <strong>become the best fit line</strong>, you will need to minimize the residuals as much as possible.  To help you out, we can draw all of them on at the same time.</p>`,
        cta: `<p><strong>Move your line closer to any selected point.</p> <p>As the residual value decreases for that point, what happens to the lengths of the other residuals?</p>`,
        quiz: {
            questions: [`The other residuals increase`, `The other residuals decrease`, `Some increase and some decrease`],
            correct: 2,
            feedback: `This is not so easy!  Simply drawing residual lengths on the chart is not doing the trick. We are going to need a trustworthy mathematical procedure, instead!`
    },	         
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showUserLine: true,
        showUserResiduals: true,
        showSingleResidual: true,
        showHighlighting: true,
        showResidualControls: true,
        showFeedback: false
    },
    
    {	title:"The 'least squares' method",
        prompt:`<p>Let's use some math to help us minimize residuals. If we want to truly find the <strong>best fit</strong> line, we need to find a line that has the lowest possible <strong>sum of all residuals</strong>.  <p>However, since some residuals are negative and some are positive, we can <strong>square</strong> each one, making them all positive, before adding them all together.</p>
        <p>The <strong>Squared Residuals</strong> table to the right shows the squared residuals for each point, as well as the total <strong>sum of squared residuals (SSR)</strong> for the line.`,	
         cta: `<p><strong>Try to achieve the lowest SSR you can.</strong></p>  <p>You can click on any point or any value in the table see how they correspond.</p><p>Note: all values displayed are rounded for readability.`,
         showPoints: true,
         showUserLineControls: true,
         showUserLine: true,
         showUserResiduals: true,
         showSingleResidual: true,
         showHighlighting: true,
         showRegressionLineControls: true,
         showResidualControls: true,
         showResidualsTable: true
        
    },

    {	title: 'Comparing SSRs',
        prompt:`<p> So, let's come back to our original question...which line is <strong>best</strong>?</p> <p>Based on what we've learned so far, the best fitting line would also be the line that has the <strong>least sum of squared residuals</strong>.
        <p>This is why the best fit line is also called the <strong>least squares line</strong>.</p>`,	
         cta: `<p><strong>You may be noticing that when you minimize the SSR for your line, your line matches the best fit line exactly!</strong></p> 
         <p>Congratulations, your line is now truly the <strong>best fit</strong> or <strong>least squares</strong> line!</p>`,
         showPoints: true,
         showUserLineControls: true,
         showRegressionLineControls: true,
         showUserLine: true,
         showSingleResidual: true,
         showHighlighting: true,
         showResidualControls: true,
         showUserResiduals: true,
         showRegressionLine: true,
         showRegressionResiduals: true,
         showResidualsTable: true
        
    }
];

