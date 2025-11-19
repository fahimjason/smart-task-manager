import { FolderKanban, CheckSquare, Users } from 'lucide-react';
import { useDashboard } from '../hooks';
import { Loader } from '../components/common';
import {
    StatCard,
    TaskStatusChart,
    OverloadedMemberCard
} from '../components/dashboard';

export const Dashboard = () => {
    const { summary, overloaded, loading } = useDashboard();

    if (loading) return <Loader />;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Overview of your projects and tasks</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Projects"
                    value={summary?.projects || 0}
                    icon={FolderKanban}
                    color="blue"
                />
                <StatCard
                    title="Total Tasks"
                    value={summary?.tasks?.total || 0}
                    icon={CheckSquare}
                    color="green"
                />
                <StatCard
                    title="Total Teams"
                    value={summary?.teams || 0}
                    icon={Users}
                    color="purple"
                />
            </div>

            {/* Task Status Chart */}
            {summary?.tasks && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TaskStatusChart tasks={summary.tasks} />
                    <OverloadedMemberCard members={overloaded} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;