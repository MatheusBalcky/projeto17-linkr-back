import jwt from 'jsonwebtoken';

export function createToken (payload){
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token
}

export function verifyToken(token){
    try {
        const verifyToken =  jwt.verify(token, process.env.JWT_SECRET);
        return verifyToken
    } catch (error) {
        return false
    }
}