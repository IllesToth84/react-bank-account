function CloseAccountModal({ dispatch, setOpenModal, balance, loan }) {
    return (
        <div className="modal">
            {/* Modal content */}
            <div className="modal-content">
                {(balance === 0 && loan === 0) && (
                    <div>
                        {' '}
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
                )}
                {(balance !== 0 || loan !== 0) && (
                    <div>
                        {' '}
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
                )}
            </div>
        </div>
    );
}

export default CloseAccountModal;
