import fs from 'fs';
import path from 'path';

const usersDataPath = path.join(process.cwd(), 'public', 'data', 'admin', 'users.json');

export default function handler(req, res) {
    const { method } = req;

    if (method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const { username, password } = req.body;

    try {
        let users = [];
        if (fs.existsSync(usersDataPath)) {
            const data = fs.readFileSync(usersDataPath, 'utf8');
            users = JSON.parse(data).users || [];
        }

        // Find user by username
        const user = users.find(u => u.username === username && u.isActive === true);

        if (user && user.password === password) {
            // In production, use proper JWT tokens or sessions
            res.status(200).json({
                message: 'Login successful',
                token: 'demo-admin-token', // This should be a proper JWT token
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
