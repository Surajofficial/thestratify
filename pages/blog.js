import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('/api/blogs');
            const allBlogs = response.data.blogs;
            setBlogs(allBlogs);

            // Sort blogs by publishedAt date and get latest 3
            const sortedBlogs = [...allBlogs].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
            setLatestBlogs(sortedBlogs.slice(0, 3));
        } catch (error) {
            setError('Error loading blogs');
            console.error('Error fetching blogs:', error);
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

    if (error) {
        return (
            <main id="main">
                <div className="container mt-5">
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            <Head>
                <title>Blog - Stratify Technology | Web Development & Technology Insights</title>
                <meta name="description" content="Read the latest insights on web development, technology trends, and business strategies from Stratify Technology. Expert articles on modern web solutions, React, Next.js, and digital marketing." />
                <meta name="keywords" content="web development blog, technology insights, business strategies, web solutions, stratify technology, react development, nextjs tutorials, digital marketing, SEO tips, web design, programming, software development, tech news, coding tutorials, frontend development, backend development, full stack development, javascript, html, css, responsive design, mobile development, e-commerce solutions, web applications, software consulting, technology trends, digital transformation, cloud computing, database management, API development, web performance, user experience, UI/UX design" />
                <meta name="author" content="Stratify Technology" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Blog - Stratify Technology | Web Development & Technology Insights" />
                <meta property="og:description" content="Read the latest insights on web development, technology trends, and business strategies from Stratify Technology. Expert articles on modern web solutions." />
                <meta property="og:url" content="https://thestratify.com/blog" />
                <meta property="og:site_name" content="Stratify Technology" />
                <meta property="og:image" content="https://thestratify.com/assets/img/website and app development services company.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blog - Stratify Technology | Web Development & Technology Insights" />
                <meta name="twitter:description" content="Read the latest insights on web development, technology trends, and business strategies from Stratify Technology." />
                <meta name="twitter:image" content="https://thestratify.com/assets/img/website and app development services company.jpg" />
                
                {/* Additional SEO */}
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="canonical" href="https://thestratify.com/blog" />
                <link rel="alternate" type="application/rss+xml" title="Stratify Technology Blog RSS Feed" href="https://thestratify.com/blog/rss.xml" />
                
                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": "Stratify Technology Blog",
                        "description": "Read the latest insights on web development, technology trends, and business strategies from Stratify Technology.",
                        "url": "https://thestratify.com/blog",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Stratify Technology",
                            "url": "https://thestratify.com",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://thestratify.com/assets/img/favicon.png"
                            }
                        },
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://thestratify.com/blog"
                        }
                    })}
                </script>
            </Head>
            <main id="main">
                <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="mb-4">
                            <h1>Our Blog</h1>
                        </div>

                        {blogs.length === 0 ? (
                            <div className="alert alert-info" role="alert">
                                No blogs available yet. Check back soon!
                            </div>
                        ) : (
                            <div className="row">
                                {blogs.map((blog) => (
                                    <div key={blog.id} className="col-md-6 mb-4">
                                        <article className="card h-100 blog-card">
                                            {blog.featuredImage && (
                                                <img 
                                                    src={blog.featuredImage} 
                                                    className="card-img-top" 
                                                    alt={blog.title}
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                            )}
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{blog.title}</h5>
                                                <p className="card-text text-muted">{blog.excerpt}</p>
                                                <div className="mt-auto">
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <small className="text-muted">
                                                            By {blog.author} • {new Date(blog.publishedAt).toLocaleDateString()}
                                                        </small>
                                                        {blog.tags && blog.tags.length > 0 && (
                                                            <div>
                                                                {blog.tags.slice(0, 2).map((tag, index) => (
                                                                    <span key={index} className="badge bg-secondary me-1">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <Link 
                                                        href={`/blog/${blog.slug}`} 
                                                        className="btn btn-primary"
                                                    >
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="col-lg-4">
                        {/* Latest Blogs Section */}
                        {latestBlogs.length > 0 && (
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h5>Latest Blogs</h5>
                                </div>
                                <div className="card-body">
                                    <div className="list-group list-group-flush">
                                        {latestBlogs.map((blog) => (
                                            <Link 
                                                key={blog.id}
                                                href={`/blog/${blog.slug}`} 
                                                className="list-group-item list-group-item-action border-0 px-0"
                                            >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h6 className="mb-1 text-dark">{blog.title}</h6>
                                                </div>
                                                <small className="text-muted">
                                                    {new Date(blog.publishedAt).toLocaleDateString()}
                                                </small>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="card">
                            <div className="card-header">
                                <h5>About Our Blog</h5>
                            </div>
                            <div className="card-body">
                                <p>Welcome to the Stratify blog! Here you'll find insights on web development, technology trends, and business strategies.</p>
                                <Link href="/contact" className="btn btn-outline-primary">
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
