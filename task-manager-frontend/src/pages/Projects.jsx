import { useState } from 'react';
import { Plus, Edit2, Trash2, FolderKanban } from 'lucide-react';
import { useProjects, useTeams } from '../hooks';
import { Button, Modal, Input, Select, Card, Loader, EmptyState } from '../components/common';

export const Projects = () => {
    const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
    const { teams } = useTeams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({ name: '', teamId: '' });
    const [formLoading, setFormLoading] = useState(false);

    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                name: project.name,
                teamId: project.teamId?._id || ''
            });
        } else {
            setEditingProject(null);
            setFormData({ name: '', teamId: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        setFormData({ name: '', teamId: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            if (editingProject) {
                await updateProject(editingProject._id, formData);
            } else {
                await createProject(formData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save project:', error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(id);
            } catch (error) {
                console.error('Failed to delete project:', error);
            }
        }
    };

    const teamOptions = teams.map(t => ({ value: t._id, label: t.name }));

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                    <p className="text-gray-600 mt-1">Manage your projects</p>
                </div>
                <Button icon={Plus} onClick={() => handleOpenModal()}>
                    Add Project
                </Button>
            </div>

            {projects.length === 0 ? (
                <EmptyState
                    icon={FolderKanban}
                    title="No projects yet"
                    description="Get started by creating your first project"
                    actionLabel="Create Project"
                    onAction={() => handleOpenModal()}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project._id} hoverable>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <FolderKanban size={24} className="text-blue-600" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                                        <p className="text-sm text-gray-600">{project.teamId?.name}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleOpenModal(project)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingProject ? 'Edit Project' : 'Add Project'}
                size="sm"
            >
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Project Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Select
                        label="Team"
                        options={teamOptions}
                        value={formData.teamId}
                        onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
                        required
                    />
                    <div className="flex gap-2">
                        <Button type="submit" className="flex-1" disabled={formLoading}>
                            {formLoading ? 'Saving...' : editingProject ? 'Update' : 'Create'}
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Projects;