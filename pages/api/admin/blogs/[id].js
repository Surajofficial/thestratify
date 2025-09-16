import fs from 'fs';
import path from 'path';

const blogsDataPath = path.join(process.cwd(), 'public', 'data', 'blog', 'blogs.json');

export default function handler(req, res) {
    const { method, query } = req;
    const { id } = query;

    // Simple authentication check (in production, use proper JWT verification)
    const token = req.headers.authorization;
    if (!token || token !== 'Bearer demo-admin-token') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let blogs = [];
        if (fs.existsSync(blogsDataPath)) {
            const data = fs.readFileSync(blogsDataPath, 'utf8');
            blogs = JSON.parse(data).blogs || [];
        }

        const blogIndex = blogs.findIndex(blog => blog.id === parseInt(id));

        if (blogIndex === -1) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        switch (method) {
            case 'GET':
                // Return single blog for admin
                res.status(200).json({ blog: blogs[blogIndex] });
                break;

            case 'PUT':
                // Update blog
                const updatedBlog = {
                    ...blogs[blogIndex],
                    ...req.body,
                    updatedAt: new Date().toISOString()
                };
                blogs[blogIndex] = updatedBlog;
                
                fs.writeFileSync(blogsDataPath, JSON.stringify({ blogs }, null, 2));
                res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
                break;

            case 'DELETE':
                // Delete blog
                blogs.splice(blogIndex, 1);
                fs.writeFileSync(blogsDataPath, JSON.stringify({ blogs }, null, 2));
                res.status(200).json({ message: 'Blog deleted successfully' });
                break;

            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
