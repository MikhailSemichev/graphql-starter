import jwt from 'jsonwebtoken';
import { AUTH_SECRET_KEY } from '../constants';

export default {
    generateToken,
    verifyToken,
};

function generateToken(user) {
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        role: user.role,
    }, AUTH_SECRET_KEY, { expiresIn: '3h' });
    return token;
}

function verifyToken(token) {
    try {
        const user = jwt.verify(token, AUTH_SECRET_KEY);
        return user;
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return null;
        }
        return null;
    }
}
