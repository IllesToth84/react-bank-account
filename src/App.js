import './styles.css';
import { useReducer, useState } from 'react';

const AMOUNT_OF_LOAN = 5000;

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
    balanceNumber: null,
};

function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
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
                                    payload: AMOUNT_OF_LOAN,
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
                                <button onClick={() => setOpenModal(null)}>
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
