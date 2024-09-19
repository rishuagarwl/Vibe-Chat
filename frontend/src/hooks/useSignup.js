import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/authContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser} = useAuthContext()  

    const signup = async({fullName, username, password, confirmPassword, gender})=>{
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender})

        if(!success) return;
        setLoading(true);
        try{
            const res = await fetch("/api/auth/signup", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName, username, password, confirmPassword, gender})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            //localstorage
            localStorage.setItem("user-info", JSON.stringify(data))
            //context
            setAuthUser(data);
        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return {loading, signup};
}

export default useSignup;

function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill in all the details");
        return false
    }
    if(password !== confirmPassword){
        toast.error("Password and Confirm Password doesn't match")
        return false
    }

    if(password.length <6){
        toast.error("password must be at least of length 6");
        return false;
    }
    return true

}