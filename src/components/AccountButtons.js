// function AccountButtons({
//     balance,
//     loan,
//     isActive,
//     dispatch,
//     setOpenModal,
//     depositeValue,
//     withdrawValue,
//     loanValue,
//     payLoanValue,
// }) {
//     return (
//         <div className="buttons">
//             <p>
//                 <button
//                     onClick={() => dispatch({ type: 'openAccount' })}
//                     disabled={isActive}
//                     className={!isActive ? 'btn-active' : ''}
//                 >
//                     Open account
//                 </button>
//             </p>
//             <p>
//                 <input
//                     type="number"
//                     value={depositeValue}
//                     name="depositValue"
//                     min={0}
//                     placeholder="Enter a value"
//                     onChange={(e) =>
//                         dispatch({
//                             type: 'depositeValue',
//                             payload: e.target.value,
//                         })
//                     }
//                     disabled={!isActive}
//                 />
//                 <button
//                     onClick={() =>
//                         dispatch({ type: 'deposit', payload: depositeValue })
//                     }
//                     disabled={!isActive}
//                     className={isActive ? 'btn-active' : ''}
//                 >
//                     Deposit
//                 </button>
//             </p>
//             <p>
//                 <input
//                     type="number"
//                     value={withdrawValue}
//                     name="withdrawValue"
//                     min={0}
//                     placeholder="Enter a value"
//                     onChange={(e) =>
//                         dispatch({
//                             type: 'withdrawValue',
//                             payload: e.target.value,
//                         })
//                     }
//                     disabled={!isActive}
//                 />
//                 <button
//                     onClick={() => {
//                         if (withdrawValue > balance) {
//                             setOpenModal('withdrawModal');
//                         } else {
//                             dispatch({
//                                 type: 'withdraw',
//                                 payload: withdrawValue,
//                             });
//                         }
//                     }}
//                     disabled={!isActive}
//                     className={isActive ? 'btn-active' : ''}
//                 >
//                     Withdraw
//                 </button>
//             </p>
//             <p>
//                 <input
//                     type="number"
//                     value={loanValue}
//                     name="loanValue"
//                     min={0}
//                     placeholder="Enter a value"
//                     onChange={(e) =>
//                         dispatch({
//                             type: 'loanValue',
//                             payload: e.target.value,
//                         })
//                     }
//                     disabled={!isActive}
//                 />
//                 <button
//                     onClick={() => {
//                         if (loan > 0) {
//                             setOpenModal('requestLoanModal');
//                         } else {
//                             dispatch({
//                                 type: 'requestLoan',
//                                 payload: loanValue,
//                             });
//                         }
//                     }}
//                     disabled={!isActive}
//                     className={isActive ? 'btn-active' : ''}
//                 >
//                     Request loan
//                 </button>
//             </p>
//             <p>
//                 <input
//                     type="number"
//                     value={payLoanValue}
//                     name="payLoanValue"
//                     min={0}
//                     placeholder="Enter a value"
//                     onChange={(e) =>
//                         dispatch({
//                             type: 'payLoanValue',
//                             payload: e.target.value,
//                         })
//                     }
//                     disabled={!isActive}
//                 />
//                 <button
//                     onClick={() => {
//                         if (loan === 0 || payLoanValue > loan) {
//                             setOpenModal('requestLoanModal');
//                         } else {
//                             dispatch({
//                                 type: 'payLoan',
//                                 payload: payLoanValue,
//                             });
//                         }
//                     }}
//                     disabled={!isActive}
//                     className={isActive ? 'btn-active' : ''}
//                 >
//                     Pay loan
//                 </button>
//             </p>
//             <p>
//                 <button
//                     onClick={() => {
//                         setOpenModal('closeAccountModal');
//                     }}
//                     disabled={!isActive}
//                     className={isActive ? 'btn-close-account' : ''}
//                 >
//                     Close account
//                 </button>
//             </p>
//         </div>
//     );
// }

// export default AccountButtons;

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
    // Inputok törlése, amikor egy másik inputra fókuszálunk
    const clearOtherInputs = (currentInput) => {
        dispatch({ type: 'clearInputs', payload: currentInput });
    };

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
                    value={depositeValue}
                    name="depositValue"
                    min={0}
                    placeholder="Enter a value"
                    onFocus={() => clearOtherInputs('depositValue')}
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
                        depositeValue &&
                        dispatch({ type: 'deposit', payload: depositeValue })
                    }
                    className={isActive ? 'btn-active' : ''}
                    disabled={!isActive}
                >
                    Deposit
                </button>
            </p>
            <p>
                <input
                    type="number"
                    value={withdrawValue}
                    name="withdrawValue"
                    min={0}
                    placeholder="Enter a value"
                    onFocus={() => clearOtherInputs('withdrawValue')}
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
                        if (withdrawValue && withdrawValue <= balance) {
                            dispatch({
                                type: 'withdraw',
                                payload: withdrawValue,
                            });
                        } else if (withdrawValue) {
                            setOpenModal('withdrawModal');
                        }
                    }}
                    className={isActive ? 'btn-active' : ''}
                    disabled={!isActive}
                >
                    Withdraw
                </button>
            </p>
            <p>
                <input
                    type="number"
                    value={loanValue}
                    name="loanValue"
                    min={0}
                    placeholder="Enter a value"
                    onFocus={() => clearOtherInputs('loanValue')}
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
                        if (loanValue) {
                            loan > 0
                                ? setOpenModal('requestLoanModal')
                                : dispatch({
                                      type: 'requestLoan',
                                      payload: loanValue,
                                  });
                        }
                    }}
                    className={isActive ? 'btn-active' : ''}
                    disabled={!isActive}
                >
                    Request loan
                </button>
            </p>
            <p>
                <input
                    type="number"
                    value={payLoanValue}
                    name="payLoanValue"
                    min={0}
                    placeholder="Enter a value"
                    onFocus={() => clearOtherInputs('payLoanValue')}
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
                        if (payLoanValue) {
                            if (loan === 0 || payLoanValue > loan) {
                                setOpenModal('requestLoanModal');
                            } else {
                                dispatch({
                                    type: 'payLoan',
                                    payload: payLoanValue,
                                });
                            }
                        }
                    }}
                    className={isActive ? 'btn-active' : ''}
                    disabled={!isActive}
                >
                    Pay loan
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
