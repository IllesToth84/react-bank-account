function RequestLoanModal({ loan, payLoanValue, setOpenModal }) {
    return (
        <div className="modal">
            {/* Modal content */}
            <div className="modal-content">
                {loan > 0 && payLoanValue <= loan && (
                    <h3>
                        You have already requested a loan. Before you can take
                        out a new loan, please repay the previous one.{' '}
                    </h3>
                )}
                {loan > 0 && payLoanValue > loan && (
                    <h3>You don't owe us that much. </h3>
                )}
                {loan === 0 && <h3>You have no loan to pay.</h3>}

                <div className="modal-buttons">
                    <button onClick={() => setOpenModal(null)}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default RequestLoanModal;
