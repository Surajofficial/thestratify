import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function BlogDetail() {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (slug) {
            fetchBlog();
        }
    }, [slug]);

    const fetchBlog = async () => {
        try {
            const response = await axios.get('/api/blogs');
            const blogs = response.data.blogs;
            const foundBlog = blogs.find(b => b.slug === slug);
            
            if (foundBlog) {
                setBlog(foundBlog);
            } else {
                setError('Blog not found');
            }
        } catch (error) {
            setError('Error loading blog');
            console.error('Error fetching blog:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main id="main">
                <div className="container mt-5">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !blog) {
        return (
            <main id="main">
                <div className="container mt-5">
                    <div className="alert alert-danger" role="alert">
                        {error || 'Blog not found'}
                    </div>
                    <Link href="/blog" className="btn btn-primary">
                        Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <>
            <Head>
                <title>{blog.metaTitle || `${blog.title} - Stratify Technology`}</title>
                <meta name="description" content={blog.metaDescription || blog.excerpt || `Read ${blog.title} on Stratify Technology blog. Expert insights on web development, technology trends, and business strategies.`} />
                <meta name="keywords" content={blog.keywords || `${blog.tags?.join(', ')}, stratify technology, web development, technology blog, ${blog.title.toLowerCase()}`} />
                <meta name="author" content={blog.author} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.metaTitle || `${blog.title} - Stratify Technology`} />
                <meta property="og:description" content={blog.metaDescription || blog.excerpt || `Read ${blog.title} on Stratify Technology blog. Expert insights on web development and technology trends.`} />
                <meta property="og:image" content={blog.featuredImage || 'https://thestratify.com/assets/img/website and app development services company.jpg'} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content={`https://thestratify.com/blog/${blog.slug}`} />
                <meta property="og:site_name" content="Stratify Technology" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={blog.metaTitle || `${blog.title} - Stratify Technology`} />
                <meta name="twitter:description" content={blog.metaDescription || blog.excerpt || `Read ${blog.title} on Stratify Technology blog.`} />
                <meta name="twitter:image" content={blog.featuredImage || 'https://thestratify.com/assets/img/website and app development services company.jpg'} />
                
                {/* Additional SEO */}
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href={`https://thestratify.com/blog/${blog.slug}`} />
                
                {/* Article specific */}
                <meta property="article:published_time" content={blog.publishedAt} />
                <meta property="article:modified_time" content={blog.updatedAt} />
                <meta property="article:author" content={blog.author} />
                <meta property="article:section" content="Technology" />
                {blog.tags && blog.tags.map((tag, index) => (
                    <meta key={index} property="article:tag" content={tag} />
                ))}
                
                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": blog.title,
                        "description": blog.metaDescription || blog.excerpt,
                        "image": blog.featuredImage || 'https://thestratify.com/assets/img/website and app development services company.jpg',
                        "author": {
                            "@type": "Person",
                            "name": blog.author
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Stratify Technology",
                            "url": "https://thestratify.com",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://thestratify.com/assets/img/favicon.png"
                            }
                        },
                        "datePublished": blog.publishedAt,
                        "dateModified": blog.updatedAt,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://thestratify.com/blog/${blog.slug}`
                        },
                        "keywords": blog.keywords || blog.tags?.join(', '),
                        "articleSection": "Technology",
                        "wordCount": blog.content ? blog.content.split(' ').length : 0
                    })}
                </script>
            </Head>
            <main id="main">
                <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8">
                        <article className="blog-post">
                            <nav aria-label="breadcrumb" className="mb-4">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link href="/blog">Blog</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {blog.title}
                                    </li>
                                </ol>
                            </nav>

                            <header className="mb-4">
                                <h1 className="display-6">{blog.title}</h1>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <small className="text-muted">
                                            By {blog.author} • {new Date(blog.publishedAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <div>
                                        {blog.tags && blog.tags.map((tag, index) => (
                                            <span key={index} className="badge bg-secondary me-1">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </header>

                            {blog.featuredImage && (
                                <div className="mb-4">
                                    <img 
                                        src={blog.featuredImage} 
                                        className="img-fluid rounded" 
                                        alt={blog.title}
                                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}

                            <div className="blog-content">
                                <div 
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                    style={{ lineHeight: '1.8' }}
                                />
                            </div>

                            <div className="mt-5">
                                <Link href="/blog" className="btn btn-outline-primary">
                                    ← Back to Blog
                                </Link>
                            </div>
                        </article>
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5>About This Post</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Author:</strong> {blog.author}</p>
                                <p><strong>Published:</strong> {new Date(blog.publishedAt).toLocaleDateString()}</p>
                                {blog.updatedAt && blog.updatedAt !== blog.publishedAt && (
                                    <p><strong>Updated:</strong> {new Date(blog.updatedAt).toLocaleDateString()}</p>
                                )}
                                {blog.tags && blog.tags.length > 0 && (
                                    <div>
                                        <strong>Tags:</strong>
                                        <div className="mt-2">
                                            {blog.tags.map((tag, index) => (
                                                <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h5>Get In Touch</h5>
                            </div>
                            <div className="card-body">
                                <p>Have questions about this post or need help with your project?</p>
                                <Link href="/contact" className="btn btn-primary">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
        </>
    );
}
