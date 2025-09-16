import fs from 'fs';
import path from 'path';

const blogsDataPath = path.join(process.cwd(), 'public', 'data', 'blog', 'blogs.json');

export default function handler(req, res) {
    const { method } = req;

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

        switch (method) {
            case 'GET':
                // Return all blogs for admin (including drafts)
                res.status(200).json({ blogs });
                break;

            case 'POST':
                // Create new blog
                const newBlog = {
                    id: Date.now(),
                    ...req.body,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                blogs.push(newBlog);
                
                fs.writeFileSync(blogsDataPath, JSON.stringify({ blogs }, null, 2));
                res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
