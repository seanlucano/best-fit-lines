import { writable } from 'svelte/store';

export const counter = writable(0);

export const sequence = [
    {	
        title: 'Welcome to best fit lines!',
        prompt: `<p>Imagine each circle you see represents a single sales transaction.</p>
        <p> Just for fun, let's say that the horizonal (x) axis represents the number of donuts purchased, and the vertical (y) axis represent the total transaction cost in US dollars.</p> `,	
        cta: `<p><strong>What best describes the dollars to donuts relationship?</p>`,
        quiz: {
            questions: [`Positive`, `Negative `],
            correct: 0,
            feedback: `As the number of donuts increases, so does transaction cost!`
        },	
        showPoints: true,
        
    },
    {	
        title: 'Imagine a line',
        prompt:`<p>These two variables have a positive relationship, meaning that as one increases, the other also increases.  But what if we needed to be more specific?</p>
        <p>Say you are on a very strict dollars to donuts budget, and you wanted to be able to <strong>predict</strong> the cost of a transaction given any number of donuts purchased.</p>
        <p>That relationship could be expressed in the form of a <strong>line</stong>.</p>`,	
         cta: `<p><strong>Using the circle handles at the end points of the line, try to place a line that would best express the dollars to donuts relationship.</strong></p><p>Click next when you are happy with your line</p>`,
         showPoints: true,
         showUserLine: true
    },
    {	
        title: 'Good line...best line',
        prompt:`<p>Nice job!  This seems like a very reasonable line!</p>  <p>But is it the... <strong>best possible line</strong>?</p>    
        <p>What if you knew that a line existed that would give you the best possible idea of the dollars to donuts relationship based on the data we have.</p>`,
         cta: `<p><strong>Use the "Best Fit Line" switch in the upper right to reveal this mysterious line!<p></strong></p>`,
        showPoints: true,
        showUserLineControls: true,
        showUserLine: true,
        showRegressionLineControls: true	
    },
    
    {	title: 'What makes a good "fit"',
        prompt:`<p>So we know that there is such a thing as a <strong>best fit</strong> line, but what makes this line so...best?  <p><strong>How do we know this new line is any better than the line you drew?</strong></p>
        <p>Here's one way to start thinking about what makes a line's fit good or bad:</p>  
        <p><strong>First you need to be able to measure the distance between each data point and the line.</strong></p>`,	
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
        prompt:` <p>For any point, we already know the number of donuts and the cost of each transaction.  But our line cannot run directly through every point.  It sometimes will be above or below one of the observed transactions.</p> 
        <p>This means that for any given number of <strong>donuts</strong>, the line is representing an <strong>expected cost</strong> that is different from the <strong>observed cost</strong>.</p>
        <p>The distance between a point and the line is the <strong>residual</strong> (or error) value for the line at each point.</p>	
        `,
        cta: `<p><strong>Click on any point to see an explanation of the the residual cost for each transaction.</strong></p><p>You can view the explanation for either line, or for both at the same time<p>`,
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showUserLine: true,
        showRegressionLine: true,
        showHighlighting: true,
        showSingleResidual: true,
        showPredictTooltip: true
    },
    {	title: 'Minimizing residuals',
        prompt: `<p>Any self-respecting <strong>best fit</strong> line would try to reduce the length of all of its residuals (or errors) as much as possible. So let's try and minimize residuals for your line.</p>`,
         cta: `<strong><p>Try moving your line around to minimize the lenghts of all residuals.</p></strong><p>You can still click any point to see the value of its residual.  Turn all residuals on and off using the "Residuals" switch above the chart.</p>`,
         showPoints: true,
         showUserLineControls: true,
         showUserLine: true,
         showUserResiduals: true,
         showSingleResidual: true,
         showHighlighting: true,
         showResidualControls: true,
    },
    
    {	title:"The 'least squares' method",
        prompt:`<p>Let's try and be a bit more scientific about this. If we want to truly find the <strong>best fit</strong> line, we would need to find a line that has the lowest possible <strong>sum of all residuals</strong>.  <p>However, since some residuals are negative and some are positive, we can <strong>square</strong> each one before adding all together.</p>
        <p>The table you're now seeing has shows the squared residual for each point, as well as a the total <strong>sum of squared residuals (SSR)</strong> for each line.`,	
         cta: `<p><strong>Click on any point, or any value in the table, to see which go together.</strong></p><p>The vlaues you are seeing displayed are rounded for readability, but don't worry!  'Under the hood' we're calculating the exact values.`,
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
        prompt:`<p> So, let's come back to our original question...which line is <strong>best</strong></p> <p>Based on what we've learned so far, the best fitting line would also be the line that has the <strong>least sum of squared residuals</strong>.
        <p>This is why the best fit line is also called the <strong>least squares line</strong></p>`,	
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
         showResidualsTable: true
        
    }
];

