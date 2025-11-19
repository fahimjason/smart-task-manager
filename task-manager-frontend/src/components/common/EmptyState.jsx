const EmptyState = ({ title = 'No items', subtitle = '', action }) => (
    <div className="p-6 text-center text-gray-600">
        <div className="text-lg font-semibold mb-2">{title}</div>
        {subtitle && <div className="mb-3">{subtitle}</div>}
        {action && <div className="mt-3">{action}</div>}
    </div>
);

export default EmptyState;