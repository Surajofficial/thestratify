import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminIndex() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to admin landing page
        router.push('/admin/landing');
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
