const User = require('../models/User')

const getAllUsers = async (req, res) => {
    // Get all users from MongoDB, selecting email, username, and roles
    const users = await User.find().select('email username roles').lean();

    // If no users
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' });
    }

    res.json(users);
}

const getUserById = async (req, res) => {
    const userId = req.params.id; // Assuming you pass the user ID as a URL parameter

    try {
        const user = await User.findById(userId).select('email username roles').lean();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.id; // Assuming you pass the user ID as a URL parameter
    const { roles } = req.body;

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's roles based on the request data
        if (roles && Array.isArray(roles)) {
            user.roles = roles;
        }

        // Save the updated user
        await user.save();

        // Exclude password and __v fields in the response
        res.json({ message: 'User roles updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteUser = async (req, res) => {
    const userId = req.params.id; // Assuming you pass the user ID as a URL parameter

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await user.deleteOne()

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}