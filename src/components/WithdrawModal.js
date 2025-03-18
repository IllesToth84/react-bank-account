function WithdrawModal({ setOpenModal }) {
    return (
        <div className="modal">
            {/* Modal content */}
            <div className="modal-content">
                <h3>There is not that much money in your balance.</h3>
                <div className="modal-buttons">
                    <button onClick={() => setOpenModal(null)}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default WithdrawModal;
