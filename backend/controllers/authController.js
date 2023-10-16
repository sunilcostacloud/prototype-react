const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = foundUser._id.toString();

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundUser.email, // Include email in the access token
                "username": foundUser.username,
                "roles": foundUser.roles,
                "userId": userId,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    // Create a secure cookie with the refresh token
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // Accessible only by the web server
        secure: true, // Requires HTTPS
        sameSite: 'None', // Cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expiry: set to match refreshToken
    });

    // Send the accessToken containing email, username, and roles
    res.json({ accessToken });
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const refreshToken = cookies.refreshToken;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const foundUser = await User.findOne({ email: decoded.email }).exec();

        if (!foundUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const userId = foundUser._id.toString();
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email, // Include email in the access token
                    "username": foundUser.username,
                    "roles": foundUser.roles,
                    "userId": userId,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken });
    });
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.refreshToken) {
        return res.sendStatus(204); // No content
    }

    // Clear both the "refreshToken" and "jwt" cookies
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    res.json({ message: 'Cookies cleared' });
};

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ 'message': 'Username, email, and password are required.' });
    }

    // Check for duplicate username and email in the database
    const duplicate = await User.findOne({ $or: [{ username }, { email }] }).exec();
    if (duplicate) {
        return res.sendStatus(409); // Conflict
    }

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create and store the new user with roles
        const result = await User.create({
            "username": username,
            "email": email,
            "password": hashedPwd,
            "roles": ["User"] // You can modify this array to include the desired roles
        });

        res.status(201).json({ 'success': `New user with username ${username} and email ${email} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    login,
    refresh,
    logout,
    register
}