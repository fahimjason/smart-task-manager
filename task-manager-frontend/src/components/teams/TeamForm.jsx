import { useState, useEffect } from 'react';
import { Input, Button } from '../common';
import { UserPlus, Trash2 } from 'lucide-react';
import { CAPACITY_RANGE } from '../../utils/constants';

export const TeamForm = ({ team, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        members: [],
    });

    useEffect(() => {
        if (team) {
            setFormData({
                name: team.name,
                members: team.members || [],
            });
        }
    }, [team]);

    const addMember = () => {
        setFormData({
            ...formData,
            members: [...formData.members, { name: '', role: '', capacity: 3 }],
        });
    };

    const updateMember = (index, field, value) => {
        const newMembers = [...formData.members];
        newMembers[index][field] = field === 'capacity' ? parseInt(value) || 0 : value;
        setFormData({ ...formData, members: newMembers });
    };

    const removeMember = (index) => {
        setFormData({
            ...formData,
            members: formData.members.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Team Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Members
                    </label>
                    <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        icon={UserPlus}
                        onClick={addMember}
                    >
                        Add Member
                    </Button>
                </div>

                <div className="space-y-3">
                    {formData.members.map((member, index) => (
                        <div key={index} className="p-3 border border-gray-200 rounded-lg">
                            <Input
                                label="Name"
                                value={member.name}
                                onChange={(e) => updateMember(index, 'name', e.target.value)}
                                required
                            />
                            <Input
                                label="Role"
                                value={member.role}
                                onChange={(e) => updateMember(index, 'role', e.target.value)}
                                required
                            />
                            <div className="flex gap-2">
                                <Input
                                    label={`Capacity (${CAPACITY_RANGE.MIN}-${CAPACITY_RANGE.MAX})`}
                                    type="number"
                                    min={CAPACITY_RANGE.MIN}
                                    max={CAPACITY_RANGE.MAX}
                                    value={member.capacity}
                                    onChange={(e) => updateMember(index, 'capacity', e.target.value)}
                                    required
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="danger"
                                    size="sm"
                                    icon={Trash2}
                                    onClick={() => removeMember(index)}
                                    className="mt-6"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    {formData.members.length === 0 && (
                        <p className="text-gray-500 text-sm text-center py-4">
                            No members added yet. Click "Add Member" to get started.
                        </p>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Saving...' : team ? 'Update Team' : 'Create Team'}
                </Button>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default TeamForm;