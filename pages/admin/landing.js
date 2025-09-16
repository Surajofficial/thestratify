import React from 'react';
import Link from 'next/link';
import AdminLoginLayout from '../../components/admin/AdminLoginLayout';

export default function AdminLanding() {
    return (
        <AdminLoginLayout>
            <div className="admin-login-page">
                <div className="login-container" style={{ maxWidth: '600px' }}>
                    <div className="login-card">
                        <div className="login-header">
                            <div className="logo">
                                <h2>Stratify</h2>
                                <p>Admin Panel</p>
                            </div>
                        </div>
                        <div className="login-body">
                            <div className="text-center mb-4">
                                <h4 className="mb-3">Welcome to Admin Panel</h4>
                                <p className="text-muted">Choose an option to continue</p>
                            </div>
                            
                            <div className="d-grid gap-3">
                                <Link href="/admin/login" className="btn btn-admin-primary">
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Admin Login
                                </Link>
                                
                                <Link href="/admin/register" className="btn btn-outline-primary">
                                    <i className="bi bi-person-plus me-2"></i>
                                    Create New User
                                </Link>
                                
                                <Link href="/blog" className="btn btn-outline-secondary">
                                    <i className="bi bi-eye me-2"></i>
                                    View Public Blog
                                </Link>
                                
                                <Link href="/" className="btn btn-outline-info">
                                    <i className="bi bi-house me-2"></i>
                                    View Website
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLoginLayout>
    );
}
