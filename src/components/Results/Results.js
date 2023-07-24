import style from './Results.module.css';
import {convertToCurrency} from '../../helpers/helperFunctions';

export default function Results(props) {
    let resultsRender;

    if (props.passUserInputData === '') {
        resultsRender = (
            <tr>
                <td colSpan="5">
                    <div className={style.message}>
                        <h2>
                            {' '}
                            Please, Fill the form above with your details so we can calculate your investment for you.
                        </h2>
                    </div>
                </td>
            </tr>
        );
    } else {
        resultsRender = props.passUserInputData.map(inv => {
            return (
                <tr key={inv.key}>
                    <td>{inv.year}</td>
                    <td>${convertToCurrency(inv.totalContributions)}</td>
                    <td>${convertToCurrency(inv.interestEarned)}</td>
                    <td>${convertToCurrency(inv.totalInterestEarned)}</td>
                    <td>${convertToCurrency(inv.endBalance)}</td>
                </tr>
            );
        });
    }

    return (
        <table className={style.result}>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Contributions</th>
                    <th>Interest Earned</th>
                    <th>Total Interest Earned</th>
                    <th>End Balance</th>
                </tr>
            </thead>
            <tbody>{resultsRender}</tbody>
        </table>
    );
}
