import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res)=>{
    const token  = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:'10d'
    })

    res.cookie("jwt", token,{
        maxAge: 15 * 24 * 60 * 60 *1000,  //ms,
        httpOnly: true,   //prevent xss attack cross-site scripting attack
        sameSite:"strict"
    })
}

export default generateTokenAndSetCookie;