import { useState, useEffect } from 'react';
import { Input, Textarea, Select, Button } from '../common';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../../utils/constants';

export const TaskForm = ({ task, projects, teams, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        projectId: '',
        assignedTo: '',
        priority: 'Medium',
        status: 'Pending',
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                projectId: task.projectId?._id || '',
                assignedTo: task.assignedTo || '',
                priority: task.priority || 'Medium',
                status: task.status || 'Pending',
            });
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Get all members from all teams
    const allMembers = teams.flatMap(team =>
        team.members.map(member => ({
            value: member._id,
            label: `${member.name} (${team.name})`,
        }))
    );

    const projectOptions = projects.map(p => ({
        value: p._id,
        label: p.name,
    }));

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Task Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
            />

            <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
            />

            <Select
                label="Project"
                options={projectOptions}
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                required
            />

            <Select
                label="Assign To"
                options={allMembers}
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                placeholder="Unassigned"
            />

            <Select
                label="Priority"
                options={PRIORITY_OPTIONS}
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                required
            />

            <Select
                label="Status"
                options={STATUS_OPTIONS}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
            />

            <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
                </Button>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default TaskForm;