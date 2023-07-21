import style from './Results.module.css';

export default function Results(props) {
    const investmentData = props.passInvestmentData.map(inv => {
        return (
            <tr>
                <td>{inv.year}</td>
                <td>{inv.savingsEndOfYear}</td>
                <td>{inv.yearlyInterest}</td>
                <td>{inv.yearlyContribution}</td>
            </tr>
        );
    });

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
            <tbody>
                <tr>
                    <td>YEAR NUMBER</td>
                    <td>TOTAL SAVINGS END OF YEAR</td>
                    <td>INTEREST GAINED IN YEAR</td>
                    <td>TOTAL INTEREST GAINED</td>
                    <td>TOTAL INVESTED CAPITAL</td>
                </tr>
                {investmentData}
            </tbody>
        </table>
    );
}
