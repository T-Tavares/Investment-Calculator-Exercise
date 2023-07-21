import style from './Form.module.css';
import {useState} from 'react';

export default function Form(props) {
    // ---------------------- UseState VARIABLES ---------------------- //

    const [currSavings, setCurrSavings] = useState('');
    const [yearlySavings, setYearlySavings] = useState('');
    const [interest, setInterest] = useState('');
    const [duration, setDuration] = useState('');

    // --------------------- USER INPUT HANDLERS ---------------------- //

    const currSavingsHandler = e => setCurrSavings(e.target.value);
    const yearlySavingsHandler = e => setYearlySavings(e.target.value);
    const interestHandler = e => setInterest(e.target.value);
    const durationHandler = e => setDuration(e.target.value);

    // ----------------- GETTING USER DATA - FUNCTION ----------------- //

    function getUserInput(e) {
        e.preventDefault();

        // Creating investment Object Data
        const investmentObj = {
            'current-savings': currSavings,
            'yearly-contribution': yearlySavings,
            'expected-return': interest,
            duration: duration,
        };

        // Clearing Input Fields
        [setCurrSavings, setYearlySavings, setInterest, setDuration].forEach(handler => handler(''));

        // Passing Investment Data Up to App.js
        props.getUserInputData(investmentObj);
    }

    // ----------------------- COMPONENT RETURN ----------------------- //

    return (
        <form onSubmit={getUserInput} className={style.form}>
            <div className={style['input-group']}>
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input onChange={currSavingsHandler} value={currSavings} type="number" id="current-savings" />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input
                        onChange={yearlySavingsHandler}
                        value={yearlySavings}
                        type="number"
                        id="yearly-contribution"
                    />
                </p>
            </div>
            <div className={style['input-group']}>
                <p>
                    <label htmlFor="expected-return">Expected Interest (%, per year)</label>
                    <input onChange={interestHandler} value={interest} type="number" id="expected-return" />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input onChange={durationHandler} value={duration} type="number" id="duration" />
                </p>
            </div>
            <p className={style.actions}>
                <button type="reset" className={style['button-alt']}>
                    Reset
                </button>
                <button type="submit" className={style.button}>
                    Calculate
                </button>
            </p>
        </form>
    );
}
