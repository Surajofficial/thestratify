import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

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
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Admin Dashboard</h1>
                <div>
                    <Link href="/admin/blog/new" className="btn btn-primary me-2">
                        Add New Blog
                    </Link>
                    <Link href="/admin/users" className="btn btn-success me-2">
                        Manage Users
                    </Link>
                    <button onClick={handleLogout} className="btn btn-outline-danger">
                        Logout
                    </button>
                </div>
            </div>

            <div className="card admin-card">
                <div className="card-header">
                    <h3>Blog Management</h3>
                </div>
                <div className="card-body">
                    {blogs.length === 0 ? (
                        <p className="text-muted">No blogs found. <Link href="/admin/blog/new">Create your first blog</Link></p>
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
                                            <td>{blog.title}</td>
                                            <td>
                                                <span className={`badge ${blog.status === 'published' ? 'bg-success' : 'bg-warning'}`}>
                                                    {blog.status}
                                                </span>
                                            </td>
                                            <td>{blog.author}</td>
                                            <td>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <Link href={`/admin/blog/edit/${blog.id}`} className="btn btn-sm btn-outline-primary me-1">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
