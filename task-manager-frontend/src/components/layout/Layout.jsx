import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../hooks';

export const Layout = ({ children, currentPage, onNavigate }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { logout } = useAuth();

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await logout();
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                currentPage={currentPage}
                onNavigate={onNavigate}
                onLogout={handleLogout}
            />

            <main className="flex-1 overflow-hidden flex flex-col">
                <Header />
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;