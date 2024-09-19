import React, { useState } from 'react'
import { useAuthContext } from '../context/authContext';
import toast from 'react-hot-toast';

const useLogout = () => {
    const[loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async()=>{
        setLoading(true);
        try{
            const res = await fetch("/api/auth/logout", {
                method:"POST",
                headers:{"Content-Type":"application/json"}
            });

            const data = await res.json();

            if(data.error){
                throw new Error(data.error)
            }
            //clear the data from local storage
            localStorage.removeItem("user-info")
            setAuthUser(null)
            //
        }
        catch(err){
            toast.error(err.message)
        }
        finally{
            setLoading(false);    
        }
    }
    return {loading, logout}
}

export default useLogout