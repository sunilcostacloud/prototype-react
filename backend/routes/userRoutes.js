const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

// Custom middleware to check if the user has the "Admin" role
const checkAdminRole = (req, res, next) => {
    const roles = req.roles;

    if (roles && roles.includes('Admin')) {
        // User has the "Admin" role, allow access
        next();
    } else {
        // User does not have the "Admin" role, deny access
        res.status(403).json({ message: 'Unauthorized: Access is restricted to Admin users.' });
    }
};

router.use(verifyJWT)

// Apply the checkAdminRole middleware to restrict access to users with the "Admin" role
router.use(checkAdminRole);

router.route('/get-all-users')
    .get(usersController.getAllUsers)

router.route('/update-user/:id')
    .patch(usersController.updateUser)

router.route('/delete-user/:id')
    .delete(usersController.deleteUser)

router.get('/:id', usersController.getUserById);

module.exports = router
