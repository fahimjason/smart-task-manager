const Modal = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
            <div className="relative bg-white p-4 rounded shadow-lg max-w-lg w-full z-10">
                {title && <div className="font-semibold mb-2">{title}</div>}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;