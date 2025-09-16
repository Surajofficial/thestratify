import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import ImageUpload from '../../../components/ImageUpload';
import RichTextEditor from '../../../components/RichTextEditor';

export default function NewBlog() {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        author: 'Stratify Team',
        status: 'draft',
        tags: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }
    }, []);

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('adminToken');
            const blogData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                publishedAt: formData.status === 'published' ? new Date().toISOString() : null
            };

            await axios.post('/api/admin/blogs', blogData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            router.push('/admin/dashboard');
        } catch (error) {
            setError('Error creating blog. Please try again.');
            console.error('Error creating blog:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Create New Blog</h1>
                <Link href="/admin/dashboard" className="btn btn-outline-secondary">
                    Back to Dashboard
                </Link>
            </div>

            <div className="card admin-card">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="slug" className="form-label">Slug *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="slug"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="excerpt" className="form-label">Excerpt *</label>
                                    <textarea
                                        className="form-control"
                                        id="excerpt"
                                        rows="3"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Content *</label>
                                    <RichTextEditor
                                        value={formData.content}
                                        onChange={(content) => setFormData({...formData, content})}
                                        placeholder="Start writing your blog content..."
                                    />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="mb-3">
                                    <ImageUpload 
                                        value={formData.featuredImage}
                                        onChange={(imageUrl) => setFormData({...formData, featuredImage: imageUrl})}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="author" className="form-label">Author</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="author"
                                        value={formData.author}
                                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        id="status"
                                        value={formData.status}
                                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tags" className="form-label">Tags</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tags"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                        placeholder="technology, web development, business"
                                    />
                                    <div className="form-text">Separate tags with commas</div>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Blog'}
                            </button>
                            <Link href="/admin/dashboard" className="btn btn-secondary">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
