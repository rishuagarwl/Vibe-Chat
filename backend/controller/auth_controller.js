import User from "../model/user.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/jwtToken.js";

 
export const signup = async(req, res)=>{
    try{
        const {fullName, username,password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error:"User already exists"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);



        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male"? boyProfilePic : girlProfilePic
        })

        if(newUser){
            //generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic:newUser.profilePic
            })
        }
        else{
            res.status(400).json({error:"Invalid data"})        }


    }
    catch(err){
        console.log("Error in signup controller", err.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const login = async(req, res)=>{
    try{
        const{username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({error:"Invalid data"});
        }

        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if(!user){
            console.log("User does not exist")
            return res.status(400).json({
                error:err.message
            })
        }

        if(!isPasswordCorrect){
            return res.status(400).json({
                error:"Invalid password"
            })
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic  
        });
        
    }
    catch(err){
        console.log("error in login controller", err.message);
        res.status(500).json({error:"internal server error"})
    }
}

export const logout = (req, res)=>{
    try{
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged Out Successfully "})
    }
    catch(err){
        console.log("error in logout controller", err.message);
        res.status(500).json({error:"internal server error"})
    }
}
