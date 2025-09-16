import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import ImageUpload from '../../../../components/ImageUpload';
import RichTextEditor from '../../../../components/RichTextEditor';
import NewAdminLayout from '../../../../components/admin/NewAdminLayout';

export default function EditBlog() {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImage: '',
        author: 'Stratify Team',
        status: 'draft',
        tags: '',
        metaTitle: '',
        metaDescription: '',
        keywords: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        if (id) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`/api/admin/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const blog = response.data.blog;
            setFormData({
                title: blog.title || '',
                slug: blog.slug || '',
                excerpt: blog.excerpt || '',
                content: blog.content || '',
                featuredImage: blog.featuredImage || '',
                author: blog.author || 'Stratify Team',
                status: blog.status || 'draft',
                tags: blog.tags ? blog.tags.join(', ') : '',
                metaTitle: blog.metaTitle || '',
                metaDescription: blog.metaDescription || '',
                keywords: blog.keywords || ''
            });
        } catch (error) {
            console.error('Error fetching blog:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                router.push('/admin/login');
            } else {
                setError('Error fetching blog');
            }
        } finally {
            setFetching(false);
        }
    };

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
            slug: generateSlug(title),
            metaTitle: title ? `${title} - Stratify Technology` : ''
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
                publishedAt: formData.status === 'published' && !formData.publishedAt ? new Date().toISOString() : formData.publishedAt
            };

            await axios.put(`/api/admin/blogs/${id}`, blogData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            router.push('/admin/dashboard');
        } catch (error) {
            setError('Error updating blog. Please try again.');
            console.error('Error updating blog:', error);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">Edit Blog</h1>
                <Link href="/admin/dashboard" className="btn btn-admin-secondary">
                    <i className="bi bi-arrow-left me-1"></i>
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

                                <div className="mb-3">
                                    <label htmlFor="metaTitle" className="form-label">SEO Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="metaTitle"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                                        placeholder="SEO optimized title for search engines"
                                        maxLength="60"
                                    />
                                    <div className="form-text">Recommended: 50-60 characters</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="metaDescription" className="form-label">Meta Description</label>
                                    <textarea
                                        className="form-control"
                                        id="metaDescription"
                                        rows="3"
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                                        placeholder="Brief description for search engines"
                                        maxLength="160"
                                    />
                                    <div className="form-text">Recommended: 150-160 characters</div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="keywords" className="form-label">Keywords</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="keywords"
                                        value={formData.keywords}
                                        onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                                        placeholder="seo, keywords, search, terms"
                                    />
                                    <div className="form-text">Separate keywords with commas</div>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-admin-primary" disabled={loading}>
                                <i className="bi bi-check-circle me-1"></i>
                                {loading ? 'Updating...' : 'Update Blog'}
                            </button>
                            <Link href="/admin/dashboard" className="btn btn-admin-secondary">
                                <i className="bi bi-x-circle me-1"></i>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </NewAdminLayout>
    );
}
