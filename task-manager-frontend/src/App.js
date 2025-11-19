import { useState } from 'react';
import { AuthProvider } from './contexts';
import { useAuth } from './hooks';
import { Layout } from './components/layout';
import { Loader } from './components/common';
import { Dashboard, Teams, Projects, Tasks, Login } from './pages';

const AppContent = () => {
    const { isAuthenticated, loading } = useAuth();
    const [currentPage, setCurrentPage] = useState('dashboard');

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading application..." />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    const pages = {
        dashboard: Dashboard,
        teams: Teams,
        projects: Projects,
        tasks: Tasks,
        analytics: Dashboard, // Placeholder
        activity: Dashboard,  // Placeholder
    };

    const CurrentPage = pages[currentPage] || Dashboard;

    return (
        <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
            <CurrentPage />
        </Layout>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;