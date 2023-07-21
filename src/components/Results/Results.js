import style from './Results.module.css';

export default function Results(props) {
    function convertToPrice(price) {
        return new Intl.NumberFormat().format(price);
    }

    const investmentElements = props.passUserInputData.map(inv => {
        return (
            <tr key={inv.id}>
                <td>{inv.year}</td>
                <td>${convertToPrice(inv.savingsEndOfYear)}</td>
                <td>${convertToPrice(inv.yearlyInterest)}</td>
                <td>${convertToPrice(inv.yearlyContribution)}</td>
                <td>${convertToPrice(inv.investedCapital)}</td>
            </tr>
        );
    });

    const message = (
        <tr>
            <td colSpan="5">
                <div className={style.message}>
                    <h2> Please, Fill the form above with your details so we can calculate your investment for you.</h2>
                </div>
            </td>
        </tr>
    );

    return (
        <table className={style.result}>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>{investmentElements.length > 0 ? investmentElements : message}</tbody>
        </table>
    );
}
