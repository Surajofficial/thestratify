import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        // Get user info (you can expand this)
        setUser({ username: 'Admin', role: 'admin' });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
    };

    const isActive = (path) => {
        return router.pathname === path;
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Stratify Admin</h3>
                    <button 
                        className="sidebar-toggle d-lg-none"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                </div>
                
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link 
                                href="/admin/dashboard" 
                                className={isActive('/admin/dashboard') ? 'active' : ''}
                            >
                                <i className="bi bi-speedometer2"></i>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/admin/blog/new" 
                                className={isActive('/admin/blog/new') ? 'active' : ''}
                            >
                                <i className="bi bi-plus-circle"></i>
                                New Blog
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/admin/users" 
                                className={isActive('/admin/users') ? 'active' : ''}
                            >
                                <i className="bi bi-people"></i>
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/admin/register" 
                                className={isActive('/admin/register') ? 'active' : ''}
                            >
                                <i className="bi bi-person-plus"></i>
                                Add User
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" target="_blank">
                                <i className="bi bi-eye"></i>
                                View Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/" target="_blank">
                                <i className="bi bi-house"></i>
                                View Website
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="admin-main">
                {/* Top Bar */}
                <header className="admin-header">
                    <div className="header-left">
                        <button 
                            className="sidebar-toggle d-lg-none"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <i className="bi bi-list"></i>
                        </button>
                        <h4 className="page-title">
                            {router.pathname === '/admin/dashboard' && 'Dashboard'}
                            {router.pathname === '/admin/blog/new' && 'New Blog'}
                            {router.pathname === '/admin/users' && 'User Management'}
                            {router.pathname === '/admin/register' && 'Add User'}
                            {router.pathname.includes('/admin/blog/edit') && 'Edit Blog'}
                        </h4>
                    </div>
                    
                    <div className="header-right">
                        <div className="user-info">
                            <span>Welcome, {user?.username}</span>
                        </div>
                        <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right"></i>
                            Logout
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="sidebar-overlay d-lg-none"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
