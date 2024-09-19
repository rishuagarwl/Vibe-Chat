import React, { useState } from 'react'
import GendercheckBox from './GendercheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:'',
  })

  const {loading , signup} = useSignup();

  const handleCheckBox = (gender)=>{
    setInputs({...inputs, gender})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await signup(inputs)
  }



  return (
    <div className='flex flex-col justify-center items-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-center text-3xl font-semibold text-gray-300'>
            SignUp
            <span className='text-blue-600'>ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input 
              type='text' 
              placeholder='Enter Full Name' 
              className='w-full input input-bordered h-10'
              value = {inputs.fullName}
              onChange={(e)=>setInputs({...inputs, fullName:e.target.value})}
              />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'> UserName</span>
            </label>
            <input 
              type='text' 
              placeholder='Enter useranme' 
              className='w-full input input-bordered h-10'
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs, username: e.target.value})}
              />
          </div>

          <div>
            <label className='label '>
              <span className='text-base label-text'> Password</span>
            </label>
            <input 
              type='password' 
              placeholder='Enter password' 
              className='w-full input input-bordered h-10'
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs, password:e.target.value})}
              />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input 
              type='password' 
              placeholder='confirm password' 
              className='w-full input input-bordered h-10'
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs, confirmPassword:e.target.value})}
              />
          </div>

          <GendercheckBox onCheckBoxChange={handleCheckBox} selectedGender={inputs.gender}/>
          <Link to="/login" className='text-sm hover:underline mt-2 inline-block hover:text-blue-600'> Already have an account?</Link>

          <div>
            <button className='btn ml-28 bnt-sm mt-4'
            disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span>: "Sign Up"}
            </button>
          </div>


        </form>

      </div>

    </div>
  )
}

export default SignUp