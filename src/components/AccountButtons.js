function AccountButtons({
    balance,
    loan,
    isActive,
    dispatch,
    setOpenModal,
    depositeValue,
    withdrawValue,
    loanValue,
    payLoanValue,
}) {
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
                <input
                    type="number"
                    name="depositValue"
                    placeholder="Enter a value"
                    onChange={(e) =>
                        dispatch({
                            type: 'depositeValue',
                            payload: e.target.value,
                        })
                    }
                    disabled={!isActive}
                />
                <button
                    onClick={() =>
                        dispatch({ type: 'deposit', payload: depositeValue })
                    }
                    disabled={!isActive}
                    className={isActive ? 'btn-active' : ''}
                >
                    Deposit {depositeValue}
                </button>
            </p>
            <p>
                <input
                    type="number"
                    name="withdrawValue"
                    placeholder="Enter a value"
                    onChange={(e) =>
                        dispatch({
                            type: 'withdrawValue',
                            payload: e.target.value,
                        })
                    }
                    disabled={!isActive}
                />
                <button
                    onClick={() => {
                        if (withdrawValue > balance) {
                            setOpenModal('withdrawModal');
                        } else {
                            dispatch({
                                type: 'withdraw',
                                payload: withdrawValue,
                            });
                        }
                    }}
                    disabled={!isActive}
                    className={isActive ? 'btn-active' : ''}
                >
                    Withdraw {withdrawValue}
                </button>
            </p>
            <p>
                <input
                    type="number"
                    name="loanValue"
                    placeholder="Enter a value"
                    onChange={(e) =>
                        dispatch({
                            type: 'loanValue',
                            payload: e.target.value,
                        })
                    }
                    disabled={!isActive}
                />
                <button
                    onClick={() => {
                        if (loan > 0) {
                            setOpenModal('requestLoanModal');
                        } else {
                            dispatch({
                                type: 'requestLoan',
                                payload: loanValue,
                            });
                        }
                    }}
                    disabled={!isActive}
                    className={isActive ? 'btn-active' : ''}
                >
                    Request a loan of {loanValue}
                </button>
            </p>
            <p>
                <input
                    type="number"
                    name="payLoanValue"
                    placeholder="Enter a value"
                    onChange={(e) =>
                        dispatch({
                            type: 'payLoanValue',
                            payload: e.target.value,
                        })
                    }
                    disabled={!isActive}
                />
                <button
                    onClick={() => {
                        if (loan === 0 || payLoanValue > loan) {
                            setOpenModal('requestLoanModal');
                        } else {
                            dispatch({
                                type: 'payLoan',
                                payload: payLoanValue,
                            });
                        }
                    }}
                    disabled={!isActive}
                    className={isActive ? 'btn-active' : ''}
                >
                    Pay a loan of {payLoanValue}
                </button>
            </p>
            <p>
                <button
                    onClick={() => {
                        setOpenModal('closeAccountModal');
                    }}
                    disabled={!isActive}
                    className={isActive ? 'btn-close-account' : ''}
                >
                    Close account
                </button>
            </p>
        </div>
    );
}

export default AccountButtons;
