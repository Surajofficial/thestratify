import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import AdminLoginLayout from '../../components/admin/AdminLoginLayout';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/admin/login', credentials);
            if (response.data.token) {
                localStorage.setItem('adminToken', response.data.token);
                router.push('/admin/dashboard');
            }
        } catch (error) {
            setError('Invalid credentials');
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
                                <h2>Stratify</h2>
                                <p>Admin Panel</p>
                            </div>
                        </div>
                        <div className="login-body">
                            <form onSubmit={handleSubmit} className="admin-form">
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={credentials.username}
                                        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                        required
                                    />
                                </div>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="btn btn-admin-primary w-100"
                                    disabled={loading}
                                >
                                    <i className="bi bi-box-arrow-in-right me-1"></i>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                                <div className="text-center mt-3">
                                    <Link href="/admin/register" className="btn btn-link">
                                        <i className="bi bi-person-plus me-1"></i>
                                        Create New User
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