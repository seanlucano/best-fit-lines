import { writable } from 'svelte/store';

export const counter = writable(0);

export const sequence = [
    {	
        title: 'Welcome to best fit lines!',
        prompt: `<p>To the right, you'll see a scatter plot with littered with a set of circles. Each circle represents a pair of values.</p>
        <p> Just for fun, let's say that the horizonal (x) values represent donuts, and the verticle (y) values represent total transactio price in US dollars.</p>  
        <p>So each cirlce represents a transaction, in which which x number of donuts were purchased for y dollars.</p> `,	
        cta: `<strong>If you had to make a quick guess, what would you say is the relationship between dollars and donuts? </strong>`,
        quiz: {
            questions: [`Positive (as donuts increase, price also increases)`, `Negative (as donuts increase, price decreases`],
            correct: 0,
            feedback: `Yes! Mo money mo donuts, indeed.`
        },	
        showPoints: true,
        
    },
    {	
        title: 'Imagine a line',
        prompt:`<p>If you said these two variables have a positive relationship...you are right!  As one increases, the other also seems to increase.  But can we get more specific?</p>
        <p>Can you imagine a line drawn through the points below that best fits the data?</p>`,	
         cta: `<strong>Turn on the "Your Line" switch and try and place your line using the circle handles. Click 'Next' when you're happy with your line.</strong>`,
         showPoints: true,
         showUserLineControls: true,
    },
    {	
        title: 'Time to compare',
        prompt:`<p>Nice job!  This seems like a good line...but is it the best line we could possibly draw to represent the relationship between the two variables?</p>  
        <p>Fortunately, statisticians have a tried and tue way of creating a line of 'Best fit' for this sort of data.</p>`,	
         cta: `<strong>Use the "Best Fit Line" switch to turning on the Best Fit Line</strong>`,
        showPoints: true,
        showUserLineControls: true,
        showUserLine: true,
        showRegressionLineControls: true	
    },
    
    {	title: 'Which line is best?',
        prompt:`<p>How do we know when a line is a good "fit" for the scatter plot?  <p>To find out, we'll need to draw a verticle line from each point on the plot to our best fit line. These verticle lines are called <strong>residuals</strong>.</p>`,	
        cta: `<strong>Click any point to draw the residuals from that point to either your line or the best fit line or both</strong>`,
        showPoints: true,
        showUserLineControls: true,
        showUserLine: true,
        showRegressionLineControls: true,
        showRegressionLine: true,
        showSingleResidual: true
        
    },
    {	title: 'What makes a best-fit line, best?',
        prompt:`<p>To find out, we'll need to draw a verticle line from each point on the plot to our best fit line. These verticle lines are called <strong>residuals</strong>.</p>`,	
        cta: `<strong>Use the switch to turn the residuals on!</strong><p>Note: You will need to have the line switch on to see the residuals for that line.</p>`,
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showRegressionLine: true,
        showSingleResidual: true
    },
    {	title: 'Residuals',
        prompt:`<p>Let's look at what a residual is by focusing on just one point at a time.</p>
        <p>A best fit line tries predict a new Y value based on a given X value. So a residual is the difference between what the best fit line expected, and what actually happened.  The best possible line would minimize the residual values as much as possible</p>`,	
         cta: `<strong>Try clicking on different points to see the residuals for each one.  You can look at the residual values for your line, the best fit line, or both.</strong>`,
         showPoints: true,
         showUserLineControls: true,
         showRegressionLineControls: true,
         showRegressionLine: true,
         showResidualControls: true,
         showRegressionResiduals: true
        
    },
    
    {	title:"The 'least squares' line",
        prompt:`<p>If we wanted to evaluate different lines to see which one is the best fit, we would try to find a line that had the lowest possible sum of residuals.  Since some residuals are negative and some are positive, we can square each one before adding them up.</p>
        <p>The table you're now seeing has a squred residual for each point, both to your line and the best fit line.</strong>`,	
         cta: `<strong>You can also click on the points, or the values in the table to see which go together.</strong>`,
         showPoints: true,
         showUserLineControls: true,
         showRegressionLineControls: true,
         showRegressionLine: true,
         showResidualControls: true,
         showRegressionResiduals: true,
         showResidualsTable: true
        
    },

    {	title: 'Comparing SSRs',
        prompt:`p>Still think your line may be better?</p>
        <p>What is the lowest possible sum or squared residuals you can get to with your line?</p>`,	
         cta: `<strong>See if you can beat the SSR value for the best fit line!</strong>`,
         showPoints: true,
         showUserLineControls: true,
         showRegressionLineControls: true,
         showRegressionLine: true,
         showUserLine: true,
         showResidualControls: true,
         showRegressionResiduals: true,
         showUserResiduals: true,
         showResidualsTable: true
        
    }
];

