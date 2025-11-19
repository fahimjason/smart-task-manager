// Lightweight placeholder for a chart; replace with recharts/chart lib later.
const TaskStatusChart = ({ data = [] }) => {
    // Render a simple textual summary for now
    const totals = data.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
    }, {});


    return (
        <div className="p-3 rounded shadow-sm bg-white">
            <div className="text-sm text-gray-500 mb-2">Task Status</div>
            <ul>
                {Object.entries(totals).length === 0 && <li className="text-gray-400">No data</li>}
                {Object.entries(totals).map(([k, v]) => (
                    <li key={k} className="flex justify-between py-1">
                        <span>{k}</span>
                        <strong>{v}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskStatusChart;