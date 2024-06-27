// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const userService = require('../service/userService');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Token Required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utiliser le secret JWT depuis les variables d'environnement
        const email = decoded.email;

        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid Access Token' });
    }
};

module.exports = authMiddleware;
