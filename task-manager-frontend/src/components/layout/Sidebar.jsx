import { Home, Users, FolderKanban, CheckSquare, Activity, BarChart3, LogOut, Menu, X } from 'lucide-react';

export const Sidebar = ({ isOpen, onToggle, currentPage, onNavigate, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'teams', label: 'Teams', icon: Users },
        { id: 'projects', label: 'Projects', icon: FolderKanban },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'activity', label: 'Activity', icon: Activity },
    ];

    return (
        <aside
            className={`bg-gray-900 text-white transition-all duration-300 flex flex-col ${isOpen ? 'w-64' : 'w-20'
                }`}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-800">
                {isOpen && (
                    <div className="flex items-center gap-2">
                        <CheckSquare size={24} className="text-blue-500" />
                        <h1 className="text-xl font-bold">Task Manager</h1>
                    </div>
                )}
                <button
                    onClick={onToggle}
                    className="text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex-1">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors ${currentPage === item.id ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                            }`}
                        title={!isOpen ? item.label : ''}
                    >
                        <item.icon size={24} />
                        {isOpen && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Logout */}
            <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors border-t border-gray-800"
                title={!isOpen ? 'Logout' : ''}
            >
                <LogOut size={24} />
                {isOpen && <span>Logout</span>}
            </button>
        </aside>
    );
};

export default Sidebar;