import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const protectRoute = async(req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                error:"Unauthorise: invalid token"
            })
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                error:"Unauthorise, Invalid token"
            })
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        req.user = user;

        next();  ///  to move to next i.e. sendMessage 
    }
    catch(error)
    {
        console.log("error in protected route", error.message);
        res.status(500).json({
            error:"internal server error"
        })
    }
}

export default protectRoute;