function RequestLoanErrModal({ setOpenModal }) {
    return (
        <div className="modal">
            {/* Modal content */}
            <div className="modal-content">
                <h3>
                   You haee no loan to pay.
                </h3>
                <div className="modal-buttons">
                    <button onClick={() => setOpenModal(null)}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default RequestLoanErrModal;
