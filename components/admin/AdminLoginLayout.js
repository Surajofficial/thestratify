import React from 'react';
import Head from 'next/head';

export default function AdminLoginLayout({ children }) {
    return (
        <>
            <Head>
                <title>Admin Login - Stratify Technology</title>
                <meta name="description" content="Admin login for Stratify Technology" />
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="admin-login-wrapper">
                {children}
            </div>
        </>
    );
}
