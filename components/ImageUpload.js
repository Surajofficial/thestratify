import React, { useState } from 'react';

export default function ImageUpload({ value, onChange, className = '' }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                onChange(result.imageUrl);
            } else {
                setError(result.error || 'Upload failed');
            }
        } catch (error) {
            setError('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={`image-upload-container ${className}`}>
            <div className="mb-3">
                <label className="form-label">Featured Image</label>
                
                {value && (
                    <div className="mb-3">
                        <img 
                            src={value} 
                            alt="Preview" 
                            className="img-thumbnail"
                            style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'cover' }}
                        />
                        <div className="mt-2">
                            <small className="text-muted">Current image: {value}</small>
                        </div>
                    </div>
                )}

                <div className="input-group">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                    <button 
                        className="btn btn-outline-secondary" 
                        type="button"
                        onClick={() => document.querySelector('input[type="file"]').click()}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Choose File'}
                    </button>
                </div>

                {error && (
                    <div className="alert alert-danger mt-2" role="alert">
                        {error}
                    </div>
                )}

                <div className="form-text">
                    Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
                </div>
            </div>

            {value && (
                <div className="mt-2">
                    <button 
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onChange('')}
                    >
                        Remove Image
                    </button>
                </div>
            )}
        </div>
    );
}
