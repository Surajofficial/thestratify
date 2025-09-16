import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import AdminLoginLayout from '../../components/admin/AdminLoginLayout';

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        role: 'editor'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/api/admin/users', {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                role: formData.role
            }, {
                headers: { Authorization: 'Bearer demo-admin-token' }
            });

            setSuccess('User created successfully! You can now login.');
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                role: 'editor'
            });
        } catch (error) {
            setError(error.response?.data?.error || 'Error creating user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLoginLayout>
            <div className="admin-login-page">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <div className="logo">
                                <h2>Create User</h2>
                                <p>Admin Registration</p>
                            </div>
                        </div>
                        <div className="login-body">
                            <form onSubmit={handleSubmit} className="admin-form">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password *</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        required
                                        minLength="6"
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password *</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select
                                        className="form-control"
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    >
                                        <option value="editor">Editor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="alert alert-success" role="alert">
                                        {success}
                                    </div>
                                )}

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-admin-primary w-100" disabled={loading}>
                                        <i className="bi bi-check-circle me-1"></i>
                                        {loading ? 'Creating...' : 'Create User'}
                                    </button>
                                </div>
                                <div className="text-center mt-3">
                                    <Link href="/admin/login" className="btn btn-link">
                                        <i className="bi bi-arrow-left me-1"></i>
                                        Back to Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLoginLayout>
    );
}
