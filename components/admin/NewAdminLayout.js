import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewAdminLayout({ children }) {
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

        // Get user info
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
        <div className="new-admin-layout">
            <div className="admin-main-container">
                {/* Sidebar */}
                <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <h3>Stratify Admin</h3>
                        <button 
                            className="sidebar-toggle-btn"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                    <div className="sidebar-content">
                        <nav className="sidebar-nav">
                            <ul>
                                <li>
                                    <Link 
                                        href="/admin/dashboard" 
                                        className={`nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
                                    >
                                        <i className="bi bi-speedometer2"></i>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/admin/blog/new" 
                                        className={`nav-item ${isActive('/admin/blog/new') ? 'active' : ''}`}
                                    >
                                        <i className="bi bi-plus-circle"></i>
                                        <span>New Blog</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/admin/users" 
                                        className={`nav-item ${isActive('/admin/users') ? 'active' : ''}`}
                                    >
                                        <i className="bi bi-people"></i>
                                        <span>Users</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/admin/register" 
                                        className={`nav-item ${isActive('/admin/register') ? 'active' : ''}`}
                                    >
                                        <i className="bi bi-person-plus"></i>
                                        <span>Add User</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" target="_blank" className="nav-item">
                                        <i className="bi bi-eye"></i>
                                        <span>View Blog</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/" target="_blank" className="nav-item">
                                        <i className="bi bi-house"></i>
                                        <span>View Website</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="sidebar-footer">
                        <div className="user-info">
                            <span>Welcome, {user?.username}</span>
                        </div>
                        <button className="logout-btn" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right"></i>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="admin-main-content">
                    <div className="content-header">
                        <button 
                            className="mobile-menu-btn"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <i className="bi bi-list"></i>
                        </button>
                        <h1 className="page-title">
                            {router.pathname === '/admin/dashboard' && 'Dashboard'}
                            {router.pathname === '/admin/blog/new' && 'New Blog'}
                            {router.pathname === '/admin/users' && 'User Management'}
                            {router.pathname === '/admin/register' && 'Add User'}
                            {router.pathname.includes('/admin/blog/edit') && 'Edit Blog'}
                        </h1>
                    </div>
                    <div className="content-wrapper">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="mobile-overlay"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
