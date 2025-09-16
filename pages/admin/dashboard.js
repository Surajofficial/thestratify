import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import NewAdminLayout from '../../components/admin/NewAdminLayout';

export default function AdminDashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('/api/admin/blogs', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBlogs(response.data.blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                router.push('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`/api/admin/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <NewAdminLayout>
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mb-0">Dashboard Overview</h1>
                        <div>
                            <Link href="/admin/blog/new" className="btn btn-admin-primary me-2">
                                <i className="bi bi-plus-circle me-1"></i>
                                New Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-3 mb-3">
                    <div className="stats-card">
                        <div className="stats-icon">
                            <i className="bi bi-file-text"></i>
                        </div>
                        <div className="stats-number">{blogs.length}</div>
                        <div className="stats-label">Total Blogs</div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="stats-card">
                        <div className="stats-icon">
                            <i className="bi bi-check-circle"></i>
                        </div>
                        <div className="stats-number">{blogs.filter(blog => blog.status === 'published').length}</div>
                        <div className="stats-label">Published</div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="stats-card">
                        <div className="stats-icon">
                            <i className="bi bi-pencil"></i>
                        </div>
                        <div className="stats-number">{blogs.filter(blog => blog.status === 'draft').length}</div>
                        <div className="stats-label">Drafts</div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="stats-card">
                        <div className="stats-icon">
                            <i className="bi bi-eye"></i>
                        </div>
                        <div className="stats-number">1,234</div>
                        <div className="stats-label">Total Views</div>
                    </div>
                </div>
            </div>

            <div className="card admin-card">
                <div className="card-header">
                    <h3><i className="bi bi-file-text me-2"></i>Recent Blogs</h3>
                </div>
                <div className="card-body">
                    {blogs.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-file-text" style={{fontSize: '3rem', color: '#6c757d'}}></i>
                            <h5 className="mt-3 text-muted">No blogs found</h5>
                            <p className="text-muted">Get started by creating your first blog post</p>
                            <Link href="/admin/blog/new" className="btn btn-admin-primary">
                                <i className="bi bi-plus-circle me-1"></i>
                                Create First Blog
                            </Link>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped admin-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Author</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogs.map((blog) => (
                                        <tr key={blog.id}>
                                            <td>
                                                <div>
                                                    <strong>{blog.title}</strong>
                                                    <br />
                                                    <small className="text-muted">{blog.excerpt?.substring(0, 50)}...</small>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge ${blog.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td>{blog.author}</td>
                                            <td>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <Link href={`/admin/blog/edit/${blog.id}`} className="btn btn-sm btn-outline-primary">
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(blog.id)}
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </NewAdminLayout>
    );
}
