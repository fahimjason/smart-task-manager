import { useState } from 'react';
import { Input, Button, Alert } from '../common';
// import { Mail, Lock } from 'lucide-react';

export const LoginForm = ({ onSubmit, onToggleForm, loading, error }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <Alert variant="danger">{error}</Alert>
            )}

            <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
            />

            <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
            />

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center">
                <button
                    type="button"
                    onClick={onToggleForm}
                    className="text-blue-600 hover:underline text-sm"
                >
                    Don't have an account? Register
                </button>
            </div>
        </form>
    );
};

export default LoginForm;