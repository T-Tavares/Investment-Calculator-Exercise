import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import {uniqueID} from './helpers/helperFunctions';
import {useState} from 'react';

function App(props) {
    const [investmentCalc, setInvestmentCalc] = useState('');

    function firstYearInvestCalc(data) {
        // Passing non-object up if users reset the calculator
        if (!data) return '';

        // having this calculation on the investObj was giving a weird bug where the toFixed() string wasn't being converted to number
        const interestProfit = +data.startingAmount * data.rateOfReturn.toFixed(2);

        const investObj = {
            key: uniqueID(),
            year: 1,
            totalContributions: +data.additionalContributionYearly.toFixed(2),
            interestEarned: +data.startingAmount * data.rateOfReturn.toFixed(2),
            totalInterestEarned: +data.startingAmount * data.rateOfReturn.toFixed(2),
            endBalance: +(interestProfit + data.startingAmount + data.additionalContributionYearly).toFixed(2),
        };
        return investObj;
    }

    function calculateInvestmentHandler(data) {
        // Passing non-object up if users reset the calculator
        if (!data) {
            setInvestmentCalc('');
            return;
        }

        // Deconstructing variables and setting initial investmentsObj array
        const {additionalContributionYearly, rateOfReturn, startingAmount, yearsToGrow} = data;
        const allYearsDataArr = [firstYearInvestCalc(data)];

        // * IMPORTANT The minus 2 on the yearsToGrow are due to
        // 1 - The for loop is already starting with the Year 1 on it.
        // 2 - To compensate an array starting from the 0 index So i dont count an extra year

        for (let i = 0; i <= yearsToGrow - 2; i++) {
            /*
                Used a investment calculator website to check and get my calculations right 
                https://smartasset.com/investing/investment-calculator#JYiopYpRG6
            */

            /* 
                This is the most complex part of this exercise. I Wasn't very happy with the function 
                offered by the course so I've decided to create my own function and values for the
                Investment Calculator. I'll break my explanation and logic to make it easier to read.
            */

            /* 
                1)  There is a allYearDataArr that will hold the data of all the years(steps) of the investment
                    growth.
                    .
                2)  That array will be Feed by the for loop I'm writing this comment with the other years calculations

                    The important thing is that every time I am updating the allYearsDataArr, The updated data of the 
                    whole array will be used to calculate the next update ( the next year )
                . 
                3)  I am making each calculation on its own variable so I can access it's value during the for loop 
                    round. This will help me to resolve all the calculations without repeat my code making it very hard
                    to read. (learned the hardest way.)
                .
                    Now let's go to the calcs.
            */
            const year = allYearsDataArr[i].year + 1; // Just adding another year to the previous year
            const totalContributions = allYearsDataArr[i].totalContributions + additionalContributionYearly; // Sum of all contributions ( witch is a fixed value)
            const interestEarned = rateOfReturn * allYearsDataArr[i].endBalance; // The return Percentual of the endBalance of the last year.

            // That was a tricky one. Here I am mapping through the whole allYearsDataArr array until this point in the loop
            // and suming up all the interestEarned of the previous years and the interestEarned of the current year.
            const totalInterestEarned =
                allYearsDataArr
                    .map(year => {
                        return year.interestEarned;
                    })
                    .reduce((total, num) => total + num) + interestEarned;

            const endBalance = startingAmount + totalContributions + totalInterestEarned; // sum of starting value, total contributions and total interest Earned.

            // current calculed year investObj to be pushed to allYearsDataArr
            const investObj = {
                key: uniqueID(),
                year: year,
                totalContributions: +totalContributions.toFixed(0),
                interestEarned: +interestEarned.toFixed(0),
                totalInterestEarned: +totalInterestEarned.toFixed(0),
                endBalance: +endBalance.toFixed(0),
            };
            allYearsDataArr.push(investObj);
        }
        setInvestmentCalc(allYearsDataArr);
    }

    /*     function calculateInvestmentHandler(data) {
        // ----------- DECONSTRUCTION OF INVESTMENT USER INPUT ------------ //

        const {startingAmount, additionalContributionYearly, rateOfReturn, yearsToGrow} = data;
        
        
        // Interest Multiplier to make everythig cleaner
        const interestMultiplier = rateOfReturn / 100;

        // ---------------------- FIRST YEAR SET UP ----------------------- //

        const interestEarned = startingAmount * interestMultiplier; // yearStartingAmount * interestMultiplier
        const totalInterestEarned = startingAmount * interestMultiplier; // Sum of All interest Earned
        const endBalance = startingAmount + additionalContributionYearly + totalInterestEarned; // startingAmount + totalContributions + totalInterest

        const firstYear = {
            year: 1,
            totalContribution: additionalContributionYearly,
            interestEarned: interestEarned,
            totalInterestEarned: totalInterestEarned,
            endBalance: endBalance,
        };
        // First entry of YearlyData Array (First Year)
        const yearlyData = [firstYear];

        // ----------- CALCULATION OF INVESTMENT EARNINGS LOGIC ----------- //
      
            And now we are ready to loop through the amount of years and calculate everything. I used the same logic as the first Year
            But I break into peaces to make it more readable 
       
        for (let i = 0; i < yearsToGrow - 1; i++) {
            // Breaking Variables to be used for Calculations (For readability)
            const nextYear = yearlyData[i].year + 1;
            const yearStartingAmount = yearlyData[i].endBalance;
            const totalContribution = additionalContributionYearly * nextYear;
            const interestEarned = yearStartingAmount * interestMultiplier;
            const totalInterestEarned = yearlyData.map(year => year.interestEarned).reduce((a, b) => a + b);
            const endBalance = startingAmount + totalContribution + totalInterestEarned;

            // Repeat of firstYear logic but this time linking the values to the previous item on the yearlyData Array
            const nextYearCalc = {
                year: nextYear,
                totalContribution: totalContribution,
                interestEarned: interestEarned,
                totalInterestEarned: totalInterestEarned,
                endBalance: endBalance,
            };

            // --------- ADDING NEW CALCULATIONS TO YEARLYDATA ARRAY ---------- //
            yearlyData.push(nextYearCalc);
        }
        console.log(yearlyData);
    } */

    return (
        <div>
            <Header />
            <Form getUserInputData={calculateInvestmentHandler} />
            <Results passUserInputData={investmentCalc} />
            {/* <Results /> */}
            {/* Todo: Show below table conditionally (only once result data is available) */}
            {/* Show fallback text if no data is available */}
        </div>
    );
}

export default App;
