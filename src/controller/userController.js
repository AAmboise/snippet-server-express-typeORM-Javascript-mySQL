// src/controller/userController.js
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        if (req.user.id !== parseInt(req.params.id)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (req.user.id !== parseInt(req.params.id)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
