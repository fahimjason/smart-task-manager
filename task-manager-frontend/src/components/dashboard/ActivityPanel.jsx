import React from 'react';

const ActivityPanel = ({ activities = [] }) => {
  return (
    <div className="p-3 rounded shadow-sm bg-white">
      <h4 className="font-medium mb-2">Recent Activity</h4>
      <ul className="text-sm">
        {activities.length === 0 && <li className="text-gray-400">No recent activity</li>}
        {activities.map((a, i) => (
          <li key={i} className="py-1 border-b last:border-b-0">
            <div className="text-gray-700">{a.title}</div>
            <div className="text-xs text-gray-400">{a.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityPanel;
