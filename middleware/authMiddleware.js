import jwt from 'jsonwebtoken'
import user from '../models/userSchema.js'
const JWT_SECRET =process.env.JWT_SECRET || 'your jwt secret';
export default async function authMiddleware(req,res,next) {
    const authHeader= req.headers.authorization;
    if(!authHeader || !authHeader.startWith('Bearer')){
        return res.status(409).json({success:false, message:"not authorized"})
    }
    const token= authHeader.split('')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await user.findById(payload.id).select('password');
    req.user = user;
    next();
    
    } catch (error) {
        next(error)
    }
}