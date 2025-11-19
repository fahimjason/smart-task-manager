import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTeams } from '../hooks';
import { Button, Modal, Loader, EmptyState } from '../components/common';
import { TeamCard, TeamForm } from '../components/teams';

export const Teams = () => {
    const { teams, loading, createTeam, updateTeam, deleteTeam } = useTeams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    const handleOpenModal = (team = null) => {
        setEditingTeam(team);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTeam(null);
    };

    const handleSubmit = async (formData) => {
        setFormLoading(true);
        try {
            if (editingTeam) {
                await updateTeam(editingTeam._id, formData);
            } else {
                await createTeam(formData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save team:', error);
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this team?')) {
            try {
                await deleteTeam(id);
            } catch (error) {
                console.error('Failed to delete team:', error);
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
                    <p className="text-gray-600 mt-1">Manage your teams and members</p>
                </div>
                <Button icon={Plus} onClick={() => handleOpenModal()}>
                    Add Team
                </Button>
            </div>

            {teams.length === 0 ? (
                <EmptyState
                    title="No teams yet"
                    description="Get started by creating your first team"
                    actionLabel="Create Team"
                    onAction={() => handleOpenModal()}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <TeamCard
                            key={team._id}
                            team={team}
                            onEdit={handleOpenModal}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingTeam ? 'Edit Team' : 'Add Team'}
            >
                <TeamForm
                    team={editingTeam}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    loading={formLoading}
                />
            </Modal>
        </div>
    );
};

export default Teams;