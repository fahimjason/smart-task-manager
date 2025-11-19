import { Card, Badge } from '../common';
import { Edit2, Trash2, Clock } from 'lucide-react';
import { getStatusColor, getPriorityColor, formatDate } from '../../utils';

export const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <Card hoverable>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                <div className="flex gap-2">
                    <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                    </Badge>
                    <button
                        onClick={() => onEdit(task)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>

            <div className="flex flex-wrap items-center gap-2 text-sm">
                <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                {task.projectId?.name && (
                    <span className="text-gray-600">• {task.projectId.name}</span>
                )}
            </div>

            {task.createdAt && (
                <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>{formatDate(task.createdAt)}</span>
                </div>
            )}
        </Card>
    );
};

export default TaskCard;