import { Card, Badge } from '../common';
import { Edit2, Trash2, Users } from 'lucide-react';

export const TeamCard = ({ team, onEdit, onDelete }) => {
    return (
        <Card hoverable>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <Users size={24} className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(team)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(team._id)}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                {team.members && team.members.length > 0 ? (
                    team.members.map((member) => (
                        <div
                            key={member._id}
                            className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded"
                        >
                            <div>
                                <p className="font-medium text-gray-900">{member.name}</p>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                            <Badge variant="primary">Capacity: {member.capacity}</Badge>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm text-center py-4">No members yet</p>
                )}
            </div>
        </Card>
    );
};

export default TeamCard;