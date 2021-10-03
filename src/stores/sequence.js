import { writable } from 'svelte/store';

export const counter = writable(0);

export const sequence = [
    {	
        title: 'Welcome to best fit lines!',
        prompt: `<p>To the right, you'll see a scatter plot littered with a set of circles. Each circle represents a pair of values.</p>
        <p> Just for fun, let's say that the horizonal (x) values represents the number of donuts purchased, and the verticle (y) values represent the total transaction cost in US dollars.</p>  
        <p>So, each circle represents a single transaction, in which which x number of donuts were purchased for y dollars.</p> `,	
        cta: `<strong>So...if you had to make a quick guess, what would you say is the relationship between dollars and donuts here? </strong>`,
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
         cta: `<strong>Using the circle handles, try to place a line that would best express the dollars to donuts relationship. It's ok if it's not perfect, just take a guess and click 'Next' when you're done.</strong>`,
         showPoints: true,
         showUserLineControls: true,
         showUserLine: true
    },
    {	
        title: 'Good line...best line',
        prompt:`<p>Nice job!  This seems like a perfectly reasonable line.  But I'm sure you can also imagine two or three different lines that would all look pretty good.</p>  
        <p>If only there were a way to figure out the <strong>best possible line</strong> that expresses the dollars to donuts relationship...hmmmmm.</p>  
        <p>As it turns out, there is! Statisticians have a tried and true way of creating a "best fit" line for this sort of data.</p>`,	
         cta: `<strong>Use the "Best Fit Line" switch to reveal this line!</strong>`,
        showPoints: true,
        showUserLineControls: true,
        showUserLine: true,
        showRegressionLineControls: true	
    },
    
    {	title: 'What makes a good "fit"',
        prompt:`<p>So now we know that there is such a thing as a "best fit" line...but what makes this line so...best?  How do we know it's any better than the line you drew?
        <p>Here's one way to start thinking about what makes a line a <strong>good fit</strong>.</p>  
        <p>What if you could measure the distance between each data point and these two lines?</p>`,	
        cta: `<strong>Click any point to reveal the line showing the distance between that point and the two lines. <p>Which line seems to produce smaller distances between itself and each point?</p> <p>Click next to dig a little deeper.</strong></p>`,
        showPoints: true,
        showUserLineControls: true,
        showUserLine: true,
        showRegressionLineControls: true,
        showRegressionLine: true,
        showSingleResidual: true
        
    },
    {	title: 'Residuals',
        prompt:`<p>You may have noticed that sometimes your line has a shorter or longer distance from each point than the best fit line...but what do these lengths actually represent?.</p>
        <p>Over on the chart, you should now see some text to help explain.  For any given point, we know exactly what the actual cost for each number of donuts was.  But in most cases, the lines actually predicted a slightly different cost for each given number of donuts.</p>
        <p>The difference between the actual observed value of each point and the predicted value of the line is called the <strong>residual</strong> value for each data point.	
        `,
        cta: `<strong>Click on any point to reveal the predicted value for each line, and the residual values associated with each.</strong></p>`,
        showPoints: true,
        showUserLineControls: true,
        showRegressionLineControls: true,
        showRegressionLine: true,
        showUserLine: true,
        showSingleResidual: true
    },
    {	title: 'Minimizing residuals',
        prompt: `<p>It seems reasonable to assume that any self respecting "best fit" line would try to reduce the length of all of its residuals as much as possible, as this would mean it tends to be closer in its predictions to the actual values we've observed in the data.</p>
         cta: `<strong><p>Let's just focus on your line for a second. Use the "Residuals" switch to turn on ALL residuals for your line at once.  Try moving your line around to see the lenghts of each residual change.</p><p>As you move your line around, you might notice that decreasing the residuals for one point might increase the residuals of another....arrrgggg!</p></strong>`,
         showPoints: true,
         showUserLineControls: true,
         showUserLine: true,
         showResidualControls: true,
    },
    
    {	title:"The 'least squares' line",
        prompt:`<p>So, if we wanted to truly evaluate different lines to see which one is the "best fit" line, we would try to find a line that had the lowest possible sum of all residuals.  However, since some residuals are negative and some are positive, we can square each one before adding them up so they don't cancel out. So this mysterious "best fit" line we've been seaching for could also be called the "least squares line."</p>
        <p>The table you're now seeing has a squared residual for each point, both to your line and the best fit line as well as a total sum of squared residuals (SSR) for each line.`,	
         cta: `<strong>You can click on any point, or any values in the table to see which go together.</strong>`,
         showPoints: true,
         showUserLineControls: true,
         showUserLine: true,
         showUserResiduals: true,
         showRegressionLineControls: true,
         showResidualControls: true,
         showResidualsTable: true
        
    },

    {	title: 'Comparing SSRs',
        prompt:`<p> Do you still think your line may be better?</p>
        <p>What is the lowest possible sum or squared residuals you can get to with your line? </p>`,	
         cta: `<strong>See if you can "beat" the SSR value for the best fit line, then we know that this line is actually the "least squares line" after all!</strong>`,
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

