function DataDisplay({ balance, loan, isActive, balanceNumber }) {
    return (
        <div className="data-display">
            <p>Balance: {balance}</p>
            <p>Loan: {loan}</p>
            <p className="balance-number">
                &nbsp;{' '}
                {isActive
                    ? `Account Number: ${balanceNumber}`
                    : 'Open a bank account with us!'}
            </p>
        </div>
    );
}

export default DataDisplay;
