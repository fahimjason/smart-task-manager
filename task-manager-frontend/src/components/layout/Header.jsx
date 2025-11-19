import { Bell, User } from 'lucide-react';
import { useAuth } from '../../hooks';

export const Header = () => {
    const { user } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
                    <p className="text-gray-600">Here's what's happening with your projects today.</p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Bell size={24} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <User size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                            <p className="text-sm text-gray-600">{user?.role || 'Member'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;