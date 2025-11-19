const Badge = ({ children, className = '' }) => (
    <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${className}`}>{children}</span>
);


export default Badge;