function AccountButtons({ loan, isActive, dispatch, setOpenModal }) {
    const AMOUNT_OF_LOAN = 5000;

    return (
        <div className="buttons">
            <p>
                <button
                    onClick={() => dispatch({ type: 'openAccount' })}
                    disabled={isActive}
                    className={!isActive ? 'btn-active' : ''}
                >
                    Open account
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: 'deposit', payload: 150 })}
                    disabled={!isActive}
                    className={isActive ? 'btn-active' : ''}
                >
                    Deposit 150
                </button>
            </p>
            <p>
                <button
                    onClick={() => dispatch({ type: 'withdraw', payload: 50 })}
                    disabled={!isActive}
                    className={isActive ? 'btn-active' : ''}
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
                    className={isActive ? 'btn-active' : ''}
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
                    className={isActive ? 'btn-active' : ''}
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
                    className={isActive ? 'btn-active' : ''}
                >
                    Close account
                </button>
            </p>
        </div>
    );
}

export default AccountButtons;
