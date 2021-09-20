import { writable } from 'svelte/store';

export const counter = writable(0);

export const sequence = [
    {	
        title: 'Welcome to best fit lines!',
        prompt: `<p>To the right, you'll see a scatter plot with some data points on it. Each point represents a pair of values.    
        <p>If you had to guess, what would you say is the relationship between the horizontal ("x") values and verticle ("y") values?</p>`,	
        cta: `<strong>Put another way, as the x values increase, what do the y values tend to do?</strong>`,
        quiz: {
            questions: [`As X increases, Y also increases`, `As X increases, Y decreases`],
            correct: 0,
            feedback: `Low values for X tend to correspond to low values for Y.`
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
        showRegressionLineControls: true,
    },
    {	
        title: 'Time to compare',
        prompt:`<p>Nice job!  This seems like a good line...but is it the best line we could possibly draw to represent the relationship between the two variables?</p>  
        <p>Fortunately, statisticians have a tried and tue way of creating a line of 'Best fit' for this sort of data.</p>`,	
         cta: `<strong>Use the "Best Fit Line" switch to turning on the Best Fit Line</strong>`,
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true	
    },
    
    {	title: 'Which line is best?',
        prompt:`<p>How do we know when a line is a good "fit" for the scatter plot?  Imagine, we had a <strong>newx value,</strong> but we didn't know what the y value would be, which line would be better at predicting the new y value.</p>`,	
        cta: `<strong>Let's find out next...</strong>`,
        showPoints: true,
        showUserLine: true,
        showRegressionLine: true,
        showUserLineControls: true,
        showRegressionLineControls: true
        
    },
    {	title: 'What makes a best-fit line, best?',
        prompt:`<p>To find out, we'll need to draw a verticle line from each point on the plot to our best fit line. These verticle lines are called <strong>residuals</strong>.</p>`,	
        cta: `<strong>Use the switch to turn the residuals on!</strong>`,
        showPoints: true,
        showUserLine: true,
        showRegressionLine: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showRegressionLineResiduals: true,
        showUserLineResiduals: true
    },
    {	title: 'Residuals',
        prompt:`<p>On the chart, we're now seeing the length of each residual.</p>
        The best fit line tries to predict a y value for a given x value.  So a residual is the difference between what the best fit line expected, and what actually happened.  So the best best-fit line would have the <strong>smallest possible sum of residuals</strong>.</p>`,	
         cta: `<strong>Let's try and add them up!</strong>`,
        
    },
    
    {	title:"The 'least squares' line",
        prompt:`<p>Since some of the residuals are positive and some are negative, we can't just do simple addition.  Instead, let's try first try squaring each number, so they are all positive, and then we'll add them up</p>
        <p>The mathematical process that generates this line attempts to create the least possible sum of squares.  So statisticians call this line...<strong>The Least Squares Line</strong>`,	
         cta: `<strong>To save you some time, use the SSR switch to show the sum of squared residuals for this line.</strong>`,
        
    },

    {	title: 'Comparing SSRs',
        prompt:`p>Still think your line may be better?</p>
        <p>Try bringing back your line using the user line switch.</p>`,	
         cta: `<strong>Keep an eye on your SSR and see if you can beat the best fit line SSR.  You can redraw your line as many times as you want.</strong>`,
        
    }
];

