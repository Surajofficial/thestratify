import fs from 'fs';
import path from 'path';

const usersDataPath = path.join(process.cwd(), 'public', 'data', 'admin', 'users.json');

export default function handler(req, res) {
    const { method } = req;

    // Simple authentication check
    const token = req.headers.authorization;
    if (!token || token !== 'Bearer demo-admin-token') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        let users = [];
        if (fs.existsSync(usersDataPath)) {
            const data = fs.readFileSync(usersDataPath, 'utf8');
            users = JSON.parse(data).users || [];
        }

        switch (method) {
            case 'GET':
                // Return all users (without passwords)
                const safeUsers = users.map(user => {
                    const { password, ...safeUser } = user;
                    return safeUser;
                });
                res.status(200).json({ users: safeUsers });
                break;

            case 'POST':
                // Create new user
                const { username, password, email, role } = req.body;
                
                // Check if username already exists
                const existingUser = users.find(user => user.username === username);
                if (existingUser) {
                    return res.status(400).json({ error: 'Username already exists' });
                }

                const newUser = {
                    id: Date.now(),
                    username,
                    password, // In production, hash this password
                    email: email || '',
                    role: role || 'editor',
                    createdAt: new Date().toISOString(),
                    isActive: true
                };
                
                users.push(newUser);
                fs.writeFileSync(usersDataPath, JSON.stringify({ users }, null, 2));
                
                // Return user without password
                const { password: _, ...safeNewUser } = newUser;
                res.status(201).json({ message: 'User created successfully', user: safeNewUser });
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
