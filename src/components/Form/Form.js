import style from './Form.module.css';
import {useState} from 'react';

export default function Form(props) {
    // ---------------------- UseState VARIABLES ---------------------- //

    const [startingAmount, setStartingAmount] = useState(10);
    const [additionalContributionYearly, setAdditionalContributionYearly] = useState(10);
    const [rateOfReturn, setRateOfReturn] = useState(10);
    const [yearsToGrow, setYearsToGrow] = useState(10);
    /*     const [startingAmount, setStartingAmount] = useState('');
    const [additionalContributionYearly, setAdditionalContributionYearly] = useState('');
    const [rateOfReturn, setRateOfReturn] = useState('');
    const [yearsToGrow, setYearsToGrow] = useState(''); */

    // --------------------- USER INPUT HANDLERS ---------------------- //

    const startingAmountHandler = e => setStartingAmount(e.target.value);
    const additionalContributionYearlyHandler = e => setAdditionalContributionYearly(e.target.value);
    const rateOfReturnHandler = e => setRateOfReturn(e.target.value);
    const yearsToGrowHandler = e => setYearsToGrow(e.target.value);

    // ----------------- GETTING USER DATA - FUNCTION ----------------- //

    function clearInputs() {
        [setStartingAmount, setAdditionalContributionYearly, setRateOfReturn, setYearsToGrow].forEach(handler =>
            handler('')
        );
    }

    function resetInvestment() {
        props.getUserInputData('');
        clearInputs();
    }

    function getUserInput(e) {
        e.preventDefault();

        // Creating investment Object Data
        const investmentObj = {
            startingAmount: +startingAmount,
            additionalContributionYearly: +additionalContributionYearly,
            rateOfReturn: +rateOfReturn / 100,
            yearsToGrow: +yearsToGrow,
        };
        // Clearing Input Fields
        clearInputs();

        // Passing Investment Data Up to App.js
        props.getUserInputData(investmentObj);
    }

    // ----------------------- COMPONENT RETURN ----------------------- //

    return (
        <form onSubmit={getUserInput} className={style.form}>
            <div className={style['input-group']}>
                <p>
                    <label htmlFor="starting-amount">Starting Amount ($)</label>
                    <input onChange={startingAmountHandler} value={startingAmount} type="number" id="starting-amount" />
                </p>
                <p>
                    <label htmlFor="additional-yearly-contribution">Additional Yearly Contribution ($)</label>
                    <input
                        onChange={additionalContributionYearlyHandler}
                        value={additionalContributionYearly}
                        type="number"
                        id="additional-yearly-contribution"
                    />
                </p>
            </div>
            <div className={style['input-group']}>
                <p>
                    <label htmlFor="rate-of-return">Rate of Return (%, per year)</label>
                    <input onChange={rateOfReturnHandler} value={rateOfReturn} type="number" id="rate-of-return" />
                </p>
                <p>
                    <label htmlFor="years-to-grow">Years to Grow</label>
                    <input onChange={yearsToGrowHandler} value={yearsToGrow} type="number" id="years-to-grow" />
                </p>
            </div>
            <p className={style.actions}>
                <button onClick={resetInvestment} type="reset" className={style['button-alt']}>
                    Reset
                </button>
                <button type="submit" className={style.button}>
                    Calculate
                </button>
            </p>
        </form>
    );
}
