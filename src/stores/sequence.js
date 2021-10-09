import { writable } from 'svelte/store';

export const counter = writable(0);

export const sequence = [
    {	
        title: 'Welcome to best fit lines!',
        prompt: `<p>To the right, you'll see a scatter plot littered with a set of circles. Each circle represents a pair of values.</p>
        <p> Just for fun, let's say that the horizonal (x) values represents the number of donuts purchased, and the vertical (y) values represent the total transaction cost in US dollars.</p>  
        <p>So, each circle represents a single transaction, in which which x number of donuts were purchased for y dollars.</p> `,	
        cta: `<p><strong>What would you say is the relationship between dollars and donuts here? </strong></p>`,
        quiz: {
            questions: [`Positive (as the number of donuts increases, cost also increases)`, `Negative (as the number of donuts increases, cost decreases)`],
            correct: 0,
            feedback: `Don't overthink it...Mo' money mo' donuts!`
        },	
        showPoints: true,
        
    },
    {	
        title: 'Imagine a line',
        prompt:`<p>These two variables have a positive relationship, meaning that as one increases, the other also increases.  But what if we needed to be more specific?</p>
        <p>Say you are on a very strict donut budget, and you wanted to be able to <strong>predict</strong> the cost of a new transaction for various numbers of donuts purchased.</p>
        <p>That relationship, between dollars and donuts, could be expressed in the form of a <strong>line</stong>.</p>`,	
         cta: `<p><strong>Using the circle handles at the end points of the line, try to place a line that would best express the dollars to donuts relationship.</strong></p><p>Click next when you are happy with your line</p>`,
         showPoints: true,
         showUserLine: true
    },
    {	
        title: 'Good line...best line',
        prompt:`<p>Nice job!  This seems like a very reasonable line!</p>  <p>But is it the... <strong>best possible line</strong>?</p>    
        <p>Statisticians have a way of calculating the best fitting line for data like this. But how do they do it?</p>`,	
         cta: `<p><strong>Use the "Best Fit Line" switch in the upper right to reveal this mysterious best fit line!<p></strong></p>`,
        showPoints: true,
        showUserLineControls: true,
        showUserLine: true,
        showRegressionLineControls: true	
    },
    
    {	title: 'What makes a good "fit"',
        prompt:`<p>So we know that there is such a thing as a <strong>best fit</strong> line, but what makes this line so...best?  <p><strong>How do we know this new line is any better than the line you drew?</strong></p>
        <p>Here's one way to start thinking about what makes a line's fit good or bad:</p>  
        <p><strong>First you need to be able to measure the distance between each data point and the line</strong></p>`,	
        cta: `<p><strong>Click any point to reveal the distance between that point and the lines.</strong></p> <p>Your line and the best fit line are different distances from each point.  Hmmmm...</p>`,
        showPoints: true,
        showUserLine: true,
        showRegressionLine: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showHighlighting: true,
        showSingleResidual: true
        
    },
    {	title: 'Residuals',
        prompt:`<p>But what do these new dotted lines represent?</p> 
        <p>For any point, we know both the number of donuts and the cost each transaction.  But even the best fit line does not run exactly through every point.  Sometimes it's a bit above or a bit below.</p> <p>This means that for any given number of <strong>donuts</strong>, the line is <strong>predicting</strong> an expected <strong>cost</strong> that is different from the <strong>observed const</strong>.</p>
        <p>That means that the distance between a point and the line tells us how much this line's prediction is different from reality, in other words, the <strong>residual</strong> (or error) value for the line at each point.</p>	
        `,
        cta: `<p><strong>Click on any point to see an explanation of the the residual cost for each transaction.</strong></p><p>You can view the explanation for either line, or for both at the same time<p>`,
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showUserLine: true,
        showRegressionLine: true,
        showSingleResidual: true,
        showHighlighting: true,
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

