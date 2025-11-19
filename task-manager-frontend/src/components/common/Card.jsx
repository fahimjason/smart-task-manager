const Card = ({ children, className = '' }) => (
    <div className={`p-4 rounded shadow-sm bg-white ${className}`}>{children}</div>
);

export default Card;