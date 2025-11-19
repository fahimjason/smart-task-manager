import { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { useAuth } from '../hooks';
import { Card } from '../components/common';
import { LoginForm, RegisterForm } from '../components/auth';

export const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, register } = useAuth();

    const handleLogin = async (formData) => {
        setError('');
        setLoading(true);
        try {
            await login(formData.email, formData.password);
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (formData) => {
        setError('');
        setLoading(true);
        try {
            await register(formData.name, formData.email, formData.password);
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <div className="text-center mb-6">
                    <CheckSquare size={48} className="mx-auto text-blue-600 mb-2" />
                    <h1 className="text-2xl font-bold text-gray-900">Smart Task Manager</h1>
                    <p className="text-gray-600 mt-1">
                        {isRegister ? 'Create your account' : 'Sign in to continue'}
                    </p>
                </div>

                {isRegister ? (
                    <RegisterForm
                        onSubmit={handleRegister}
                        onToggleForm={() => setIsRegister(false)}
                        loading={loading}
                        error={error}
                    />
                ) : (
                    <LoginForm
                        onSubmit={handleLogin}
                        onToggleForm={() => setIsRegister(true)}
                        loading={loading}
                        error={error}
                    />
                )}
            </Card>
        </div>
    );
};

export default Login;
