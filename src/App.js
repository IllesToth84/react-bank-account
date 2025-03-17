import './styles.css';
import { useReducer, useState } from 'react';
/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const AMOUNT_OF_LOAN = 5000;

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
    balanceNumber: null,
};

function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000); // 10 számjegyű szám
}

function reducer(state, action) {
    if (!state.isActive && action.type !== 'openAccount') return state;

    switch (action.type) {
        case 'openAccount':
            return {
                ...state,
                balance: 500,
                isActive: true,
                balanceNumber: generateAccountNumber(),
            };
        case 'deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        case 'withdraw':
            return {
                ...state,
                balance: state.balance - action.payload,
            };

        case 'requestLoan':
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload,
                balance: state.balance + action.payload,
            };

        case 'payLoan':
            return {
                ...state,
                loan: 0,
                balance: state.balance - state.loan,
            };
        case 'closeAccount':
            if (state.loan > 0 || state.balance !== 0) return state;
            return initialState;
        default:
            throw new Error('Action unknown');
    }
}

export default function App() {
    const [{ balance, loan, isActive, balanceNumber }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const [openModal, setOpenModal] = useState(null);

    return (
        <div className="App">
            <h1>useReducer Bank Account</h1>

            <div className="data-display">
                <p>Balance: {balance}</p>
                <p>Loan: {loan}</p>
                <p className="balance-number">
                    &nbsp;{' '}
                    {isActive
                        ? `Number: ${balanceNumber}`
                        : 'Open a bank account with us!'}
                </p>
            </div>
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
                        onClick={() =>
                            dispatch({ type: 'deposit', payload: 150 })
                        }
                        disabled={!isActive}
                    >
                        Deposit 150
                    </button>
                </p>
                <p>
                    <button
                        onClick={() =>
                            dispatch({ type: 'withdraw', payload: 50 })
                        }
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
                                    payload: 5000,
                                });
                            }
                        }}
                        disabled={!isActive}
                    >
                        Request a loan of {AMOUNT_OF_LOAN}
                    </button>
                </p>
                {openModal === 'requestLoanModal' && (
                    // The Modal
                    <div className="modal">
                        {/* Modal content */}
                        <div className="modal-content">
                            <h3>
                                You have already requested a loan. Before you
                                can take out a new loan, please repay the
                                previous one.{' '}
                            </h3>
                            <div className="modal-buttons">
                                <button
                                    onClick={() =>
                                        setOpenModal(null)
                                    }
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <p>
                    <button
                        onClick={() => dispatch({ type: 'payLoan' })}
                        disabled={!isActive}
                    >
                        Pay loan
                    </button>
                </p>
                <p>
                    <button
                        onClick={() => {
                            if (balance === 0 && loan === 0) {
                                setOpenModal('closeAccModal');
                            } else {
                                setOpenModal('cantCloseAccModal');
                            }
                        }}
                        disabled={!isActive}
                    >
                        Close account
                    </button>
                </p>
            </div>
            {openModal === 'closeAccModal' && (
                // The Modal
                <div className="modal">
                    {/* Modal content */}
                    <div className="modal-content">
                        <h3>Are you sure you want to close your account?</h3>
                        <div className="modal-buttons">
                            <button
                                onClick={() => {
                                    dispatch({ type: 'closeAccount' });
                                    setOpenModal(null);
                                }}
                            >
                                Yes
                            </button>{' '}
                            <button onClick={() => setOpenModal(null)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {openModal === 'cantCloseAccModal' && (
                // The Modal
                <div className="modal">
                    {/* Modal content */}
                    <div className="modal-content">
                        <h3>
                            You can only close your account if both your balance
                            and your loan are equal to zero.{' '}
                        </h3>
                        <div className="modal-buttons">
                            <button onClick={() => setOpenModal(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
