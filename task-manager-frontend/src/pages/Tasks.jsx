import { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { useTasks, useProjects, useTeams } from '../hooks';
import { Button, Modal, Loader, EmptyState, Alert } from '../components/common';
import { TaskCard, TaskForm } from '../components/tasks';

export const Tasks = () => {
    const { tasks, loading, createTask, updateTask, deleteTask, reassignTasks } = useTasks();
    const { projects } = useProjects();
    const { teams } = useTeams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [reassignLoading, setReassignLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleOpenModal = (task = null) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleSubmit = async (formData) => {
        setFormLoading(true);
        try {
            if (editingTask) {
                await updateTask(editingTask._id, formData);
            } else {
                await createTask(formData);
            }
            handleCloseModal();
            setMessage({ type: 'success', text: 'Task saved successfully' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'danger', text: error.message });
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id);
                setMessage({ type: 'success', text: 'Task deleted successfully' });
                setTimeout(() => setMessage(null), 3000);
            } catch (error) {
                setMessage({ type: 'danger', text: error.message });
            }
        }
    };

    const handleReassign = async () => {
        setReassignLoading(true);
        try {
            const result = await reassignTasks();
            setMessage({ type: 'success', text: result.message });
            setTimeout(() => setMessage(null), 5000);
        } catch (error) {
            setMessage({ type: 'danger', text: error.message });
        } finally {
            setReassignLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
                    <p className="text-gray-600 mt-1">Manage and track your tasks</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        icon={RefreshCw}
                        variant="secondary"
                        onClick={handleReassign}
                        disabled={reassignLoading}
                    >
                        {reassignLoading ? 'Reassigning...' : 'Auto Reassign'}
                    </Button>
                    <Button icon={Plus} onClick={() => handleOpenModal()}>
                        Add Task
                    </Button>
                </div>
            </div>

            {message && (
                <Alert variant={message.type} onClose={() => setMessage(null)}>
                    {message.text}
                </Alert>
            )}

            {tasks.length === 0 ? (
                <EmptyState
                    title="No tasks yet"
                    description="Get started by creating your first task"
                    actionLabel="Create Task"
                    onAction={() => handleOpenModal()}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={handleOpenModal}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingTask ? 'Edit Task' : 'Add Task'}
            >
                <TaskForm
                    task={editingTask}
                    projects={projects}
                    teams={teams}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    loading={formLoading}
                />
            </Modal>
        </div>
    );
};

export default Tasks;