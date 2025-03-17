function CloseAccErrorModal({ setOpenModal }) {
    return (
        <div className="modal">
            {/* Modal content */}
            <div className="modal-content">
                <h3>
                    You can only close your account if both your balance and
                    your loan are equal to zero.{' '}
                </h3>
                <div className="modal-buttons">
                    <button onClick={() => setOpenModal(null)}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default CloseAccErrorModal;
