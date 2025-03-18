function RequestLoanModal({ loan, loanValue, payLoanValue, setOpenModal }) {
    let message = '';

    if (loan > 0 && payLoanValue > loan) {
        message = "You don't owe us that much.";
    } else if (loan > 0 && loanValue) {
        message =
            'You have already requested a loan. Before you can take out a new loan, please repay the previous one.';
    } else if (loan === 0) {
        message = 'You have no loan to pay.';
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{message}</h3>
                <div className="modal-buttons">
                    <button onClick={() => setOpenModal(null)}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default RequestLoanModal;
