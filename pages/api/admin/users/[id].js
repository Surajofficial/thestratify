import fs from 'fs';
import path from 'path';

const usersDataPath = path.join(process.cwd(), 'public', 'data', 'admin', 'users.json');

export default function handler(req, res) {
    const { method, query } = req;
    const { id } = query;

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

        const userIndex = users.findIndex(user => user.id === parseInt(id));

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        switch (method) {
            case 'GET':
                // Return single user (without password)
                const { password: _pw, ...safeUser } = users[userIndex];
                res.status(200).json({ user: safeUser });
                break;

            case 'PUT':
                // Update user
                const { username, password, email, role, isActive } = req.body;
                
                // Check if username already exists (excluding current user)
                if (username) {
                    const existingUser = users.find(user => user.username === username && user.id !== parseInt(id));
                    if (existingUser) {
                        return res.status(400).json({ error: 'Username already exists' });
                    }
                }

                const updatedUser = {
                    ...users[userIndex],
                    ...(username && { username }),
                    ...(password && { password }), // In production, hash this password
                    ...(email && { email }),
                    ...(role && { role }),
                    ...(typeof isActive === 'boolean' && { isActive }),
                    updatedAt: new Date().toISOString()
                };
                
                users[userIndex] = updatedUser;
                fs.writeFileSync(usersDataPath, JSON.stringify({ users }, null, 2));
                
                // Return user without password
                const { password: _, ...safeUpdatedUser } = updatedUser;
                res.status(200).json({ message: 'User updated successfully', user: safeUpdatedUser });
                break;

            case 'DELETE':
                // Delete user (soft delete by setting isActive to false)
                users[userIndex].isActive = false;
                users[userIndex].deletedAt = new Date().toISOString();
                fs.writeFileSync(usersDataPath, JSON.stringify({ users }, null, 2));
                res.status(200).json({ message: 'User deactivated successfully' });
                break;

            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
