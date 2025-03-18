import './styles.css';
import { useReducer, useState } from 'react';
import DataDisplay from './components/DataDisplay';
import AccountButtons from './components/AccountButtons';
import WithdrawModal from './components/WithdrawModal';
import RequestLoanModal from './components/RequestLoanModal';
import CloseAccountModal from './components/CloseAccountModal';

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
    balanceNumber: null,
    depositeValue: 0,
    withdrawValue: 0,
    loanValue: 0,
    payLoanValue: 0,
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
                balance: state.balance + Number(action.payload),
            };
        case 'withdraw':
            return {
                ...state,
                balance:
                    state.balance - Number(action.payload) >= 0
                        ? state.balance - Number(action.payload)
                        : state.balance,
            };

        case 'requestLoan':
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload,
                balance: state.balance + Number(action.payload),
            };

        case 'payLoan':
            return {
                ...state,
                loan:
                    Number(action.payload) <= state.loan
                        ? state.loan - Number(action.payload)
                        : state.loan,
                balance:
                    Number(action.payload) <= state.loan
                        ? state.balance - Number(action.payload)
                        : state.balance,
            };
        case 'closeAccount':
            if (state.loan > 0 || state.balance !== 0) return state;
            return initialState;

        case 'depositeValue':
            return { ...state, depositeValue: action.payload };
        case 'withdrawValue':
            return { ...state, withdrawValue: action.payload };
        case 'loanValue':
            return { ...state, loanValue: action.payload };
        case 'payLoanValue':
            return { ...state, payLoanValue: action.payload };
        default:
            throw new Error('Action unknown');
    }
}

export default function App() {
    const [
        {
            balance,
            loan,
            isActive,
            balanceNumber,
            depositeValue,
            withdrawValue,
            loanValue,
            payLoanValue,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

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
                depositeValue={depositeValue}
                withdrawValue={withdrawValue}
                loanValue={loanValue}
                payLoanValue={payLoanValue}
            />

            {/* Modals  */}
            {openModal === 'withdrawModal' && (
                <WithdrawModal setOpenModal={setOpenModal} />
            )}
            {openModal === 'requestLoanModal' && (
                <RequestLoanModal
                    loan={loan}
                    payLoanValue={payLoanValue}
                    setOpenModal={setOpenModal}
                />
            )}
            {openModal === 'closeAccountModal' && (
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
