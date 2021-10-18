import { writable } from 'svelte/store';

export const counter = writable(0);

export const sequence = [
    {	
        title: 'Welcome to best fit lines!',
        prompt: `<p>Imagine each circle you see represents a single sales transaction.</p>
        <p>Just for fun, let's say all each transactions is for some (x) number of donuts for some (y) amount of US Dollars.</p>`,	
        cta: `<p><strong>What best describes the dollars to donuts relationship?</p>`,
        quiz: {
            questions: [`Positive`, `Negative `],
            correct: 0,
            feedback: `It's positive! As the number of donuts increases, so does transaction cost.`
        },	
        showPoints: true,
        
    },
    {	
        title: 'Imagine a line',
        prompt:`<p>We know that these two variables have a positive relationship.  But what if we would like to be more specific?</p>
        <p>Imagine you are on a very strict dollars to donuts budget, and you wanted to be able to <strong>predict</strong> the cost of a new transaction given any number of donuts purchased.</p>
        <p>That relationship could be expressed in the form of a <strong>line</stong>.</p>`,	
         cta: `<p><strong>Using the circle handles at the end points of the line, try to place a line that would best express the dollars to donuts relationship.</strong></p><p>Click "Next" when you are happy with your line</p>`,
         showPoints: true,
         showUserLine: true
    },
    {	
        title: 'Good line...best line',
        prompt:`<p>Nice job!  This seems like a very reasonable line!</p>  <p>But is it the... <strong>best possible line</strong>?</p>    
        <p>What if you knew that a line existed that would give you the best possible linear relationship between dollars and donuts?</p>`,
        cta: `<p><strong>Use the "Best Fit Line" switch in the upper right to reveal this mysterious line!<p></strong></p>`,
        cta: `<p><strong>What do you think makes the purple line a better fit than your line?</p>`,
        quiz: {
            questions: [`The slope of the line`, `The distance between the line and each point`, `The y-intercept of the line`, `Something else entirely`],
            correct: 0,
            feedback: `It's the distance! Click "Next" to learn more.`
        },	
        showPoints: true,
        showUserLineControls: true,
        showUserLine: true,
        showRegressionLineControls: true	
    },
    
    {	title: 'What makes a good "fit"',
        prompt:`<p>So we know that there is such a thing as a <strong>best fit</strong> line, but what makes this line so...best?  <p><strong>How do we know this new line is any better than the line you drew?</strong></p>
        <p>Here's one way to start thinking about what makes a line's fit good or bad: <strong>you need to be able to measure the distance between each data point and the line.</strong></p>`,	
        cta: `<p><strong>Click any point to reveal the distance between that point and the lines.</strong></p> <p>Ok, sort of interesting...but so what?</p>`,
        showPoints: true,
        showUserLine: true,
        showRegressionLine: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showHighlighting: true,
        showSingleResidual: true
        
    },
    {	title: 'Residuals',
        prompt:` <p>Each points tells us about an <strong>observed</strong> transaction.  Our line, on the other hand, is making a <strong>prediction</strong> about a future transaction.</p>
        <p>The distance between the <strong>observed</strong> cost and the line's <strong>predicted</strong> cost is the <strong>residual</strong> (or error) value for the line at each point.</p>	
        `,
        cta: `<p><strong>Click on any point to see an explanation of the residual cost for each transaction.</strong></p><p>You can view the explanation for either line, or for both at the same time<p>`,
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showUserLine: true,
        showHighlighting: true,
        showSingleResidual: true,
        showPredictTooltip: true
    },
    {	title: 'Minimizing residuals',
        prompt: `<p>Any self-respecting <strong>best fit</strong> line would try to reduce the length of all of its residuals (or errors) as much as possible. So let's try to minimize residuals for your line.</p>`,
        cta: `<strong><p>Try moving your line around to minimize the lengths of all residuals.</p></strong><p>You can still click any point to see the value of its residual.  Turn all residuals on and off using the "Residuals" switch above the chart.</p>`,
        cta: `<p><strong>As you move your line closer to any given point, what happens to the residuals for the other points?</p>`,
        quiz: {
            questions: [`The residual increases`, `The residual decreases`, `Both of the above`],
            correct: 0,
            feedback: `It's both! And that's what's so tricky about finding the <strong>best fit line</strong>. We need to minimize the <strong>sum</strong> of all the residuals!`
    },	         
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showUserLine: true,
        showUserResiduals: true,
        showSingleResidual: true,
        showHighlighting: true,
        showResidualControls: true,
    },
    
    {	title:"The 'least squares' method",
        prompt:`<p>Let's try to be a bit more scientific about this. If we want to truly find the <strong>best fit</strong> line, we need to find a line that has the lowest possible <strong>sum of all residuals</strong>.  <p>However, since some residuals are negative and some are positive, we can <strong>square</strong> each one before adding them all together. This makes each one positive.</p>
        <p>The table you're now seeing shows the squared residual for each point, as well as the total <strong>sum of squared residuals (SSR)</strong> for each line.`,	
         cta: `<p><strong>Click on any point, or any value in the table, to see which go together.</strong></p><p>The values you are seeing displayed are rounded for readability, but don't worry!  'Under the hood' we're calculating the exact values.`,
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
         cta: `<p><strong>What is the lowest SSR you can get for your line?</strong></p> 
         <p>If the only way to get the lowest possible SSR is to match the SSR of the best fit line, then we know that your line is now truly the <strong>best fit</strong> or <strong>least squares</strong> line!</p>`,
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

