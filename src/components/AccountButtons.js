function AccountButtons({ balance, loan, isActive, dispatch, setOpenModal }) {
    const AMOUNT_OF_LOAN = 5000;

    return (
        <div className="buttons">
            <p>
                <button
                    onClick={() => dispatch({ type: 'openAccount' })}
                    disabled={isActive}
                >
                    Open account
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: 'deposit', payload: 150 })}
                    disabled={!isActive}
                >
                    Deposit 150
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: 'withdraw', payload: 50 })}
                    disabled={!isActive}
                >
                    Withdraw 50
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        if (loan > 0) {
                            setOpenModal('requestLoanModal');
                        } else {
                            dispatch({
                                type: 'requestLoan',
                                payload: AMOUNT_OF_LOAN,
                            });
                        }
                    }}
                    disabled={!isActive}
                >
                    Request a loan of {AMOUNT_OF_LOAN}
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        if (loan === 0) {
                            setOpenModal('requestLoanModal');
                        } else {
                            dispatch({
                                type: 'payLoan',
                            });
                        }
                    }}
                    disabled={!isActive}
                >
                    Pay loan
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        setOpenModal('CloseAccountModal');
                    }}
                    disabled={!isActive}
                >
                    Close account
                </button>
            </p>
        </div>
    );
}

export default AccountButtons;
