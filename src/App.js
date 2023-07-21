import Form from './components/Form/Form';
import Header from './components/Header/Header';
import Results from './components/Results/Results';

import {useState} from 'react';

function App(props) {
    const [investmentCalc, setInvestmentCalc] = useState([]);

    const calculateHandler = userInput => {
        const yearlyData = []; // per-year results

        let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
        const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
        const expectedReturn = +userInput['expected-return'] / 100;
        const duration = +userInput['duration'];
        const investedCapital = currentSavings;

        // The below code calculates yearly results (total savings, interest etc)
        for (let i = 0; i < duration; i++) {
            const yearlyInterest = currentSavings * expectedReturn;
            currentSavings += yearlyInterest + yearlyContribution;
            yearlyData.push({
                // feel free to change the shape of the data pushed to the array!
                year: i + 1,
                yearlyInterest: yearlyInterest,
                savingsEndOfYear: currentSavings,
                yearlyContribution: yearlyContribution,
                investedCapital: investedCapital,
                id: `${Math.random()}`.slice(2),
            });
        }

        setInvestmentCalc(yearlyData);
        // do something with yearlyData ...
    };

    return (
        <div>
            <Header />
            <Form getUserInputData={calculateHandler} />
            <Results passUserInputData={investmentCalc} />
            {/* <Results /> */}
            {/* Todo: Show below table conditionally (only once result data is available) */}
            {/* Show fallback text if no data is available */}
        </div>
    );
}

export default App;
