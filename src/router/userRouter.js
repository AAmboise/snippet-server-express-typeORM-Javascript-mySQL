const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Middleware pour les requêtes spécifiques à l'utilisateur
router.param('id', async (req, res, next, id) => {
    try {
        const user = await userController.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
