import './styles.css';
import { useReducer, useState } from 'react';
import DataDisplay from './components/DataDisplay';
import AccountButtons from './components/AccountButtons';
import RequestLoanModal from './components/RequestLoanModal';
import CloseAccountModal from './components/CloseAccountModal';

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

            <DataDisplay
                balance={balance}
                loan={loan}
                isActive={isActive}
                balanceNumber={balanceNumber}
            />

            <AccountButtons
                balance={balance}
                loan={loan}
                isActive={isActive}
                dispatch={dispatch}
                setOpenModal={setOpenModal}
            />

            {/* Modals  */}
            {openModal === 'requestLoanModal' && (
                <RequestLoanModal loan={loan} setOpenModal={setOpenModal} />
            )}
            {openModal === 'CloseAccountModal' && (
                <CloseAccountModal
                    dispatch={dispatch}
                    setOpenModal={setOpenModal}
                    balance={balance}
                    loan={loan}
                />
            )}
        </div>
    );
}
