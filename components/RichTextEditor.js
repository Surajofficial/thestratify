import React from 'react';

export default function RichTextEditor({ value, onChange, placeholder = "Start writing your content..." }) {
    return (
        <div className="simple-text-editor">
            <textarea
                className="form-control"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={15}
                style={{
                    minHeight: '300px',
                    resize: 'vertical',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    lineHeight: '1.6'
                }}
            />
            <div className="editor-help mt-2">
                <small className="text-muted">
                    <strong>HTML Formatting Help:</strong><br/>
                    • Use &lt;h1&gt; to &lt;h6&gt; for headings<br/>
                    • Use &lt;p&gt; for paragraphs<br/>
                    • Use &lt;strong&gt; for bold and &lt;em&gt; for italic<br/>
                    • Use &lt;ul&gt; and &lt;li&gt; for lists<br/>
                    • Use &lt;a href="url"&gt; for links<br/>
                    • Use &lt;img src="url" alt="text"&gt; for images
                </small>
            </div>
        </div>
    );
}