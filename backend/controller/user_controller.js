import User from "../model/user.js";

export const getUser = async(req, res)=>{
    try{
        const userId = req.user._id;

        const filteredUser = await User.find({_id: {$ne: userId}}).select("-password");

        res.status(200).json(filteredUser);
    }
    catch(error){
        console.log("error in getting all user details", error.message);
        res.status(500).json({
            error:"Internal server error",
        })
    }
}