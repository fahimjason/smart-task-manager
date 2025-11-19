import React, { useState } from 'react';
import { Input, Button, Alert } from '../common';

export const RegisterForm = ({ onSubmit, onToggleForm, loading, error }) => {
    const [formData, setFormData] = useState({
        name: '',
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
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
            />

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
                placeholder="Create a password (min. 6 characters)"
                required
            />

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Register'}
            </Button>

            <div className="text-center">
                <button
                    type="button"
                    onClick={onToggleForm}
                    className="text-blue-600 hover:underline text-sm"
                >
                    Already have an account? Login
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
