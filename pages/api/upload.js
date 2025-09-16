import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const form = formidable({
            uploadDir: path.join(process.cwd(), 'public', 'uploads', 'blog'),
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB limit
            filter: function ({ name, originalFilename, mimetype }) {
                // Only allow image files
                return Boolean(mimetype && mimetype.includes('image'));
            },
        });

        const [fields, files] = await form.parse(req);
        
        if (!files.image || files.image.length === 0) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const file = files.image[0];
        
        // Generate unique filename
        const timestamp = Date.now();
        const extension = path.extname(file.originalFilename || '');
        const filename = `blog_${timestamp}${extension}`;
        const newPath = path.join(process.cwd(), 'public', 'uploads', 'blog', filename);
        
        // Move file to final location
        fs.renameSync(file.filepath, newPath);
        
        // Return the public URL
        const imageUrl = `/uploads/blog/${filename}`;
        
        res.status(200).json({ 
            message: 'Image uploaded successfully',
            imageUrl: imageUrl
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Error uploading image' });
    }
}
