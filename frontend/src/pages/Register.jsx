import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/config';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  
  const togglePasswordButton = ()=>{
    if(togglePassword === false){
      setTogglePassword(true);
    }else{
      setTogglePassword(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, data);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response.data.message);
    }
  };

  return (
    <>
    <div className='h-screen flex flex-col mx-auto items-center justify-center'>
      <h1 className="mb-7 text-4xl font-extrabold">Register on Resumin</h1>
    <div className=' p-10 shadow-lg lg:border-2 border-slate-600 rounded-lg '>
    <form onSubmit={handleSubmit(onSubmit)} className='px-20 pb-10 '>
      <div className="mb-5 flex justify-center flex-col">
      <input 
        {...register("name", { required: "Name is required" })} 
        placeholder="Name" 
        className='input input-bordered input-accent'
      />
      {errors.name && <span className='text-red-600 text-base'>{errors.name.message}</span>}
      </div>
      <div className="mb-5  flex justify-center flex-col">
      <input 
        {...register("email", { required: "Email is required" })} 
        placeholder="Email" 
        className='input input-bordered input-info'
      />
      {errors.email && <span  className='text-red-600 text-base'>{errors.email.message}</span>}
      </div>
      <div className="mb-5 flex flex-col justify-center relative">
      <input 
        type={togglePassword ? "text" : "password"}
        {...register("password", { required: "Password is required" },{ pattern: /^[A-Za-z]+$/i})} 
        placeholder="Password"
        className='input input-bordered input-secondary' 
      />  
      {errors.password && <span className='text-red-600 text-base'>{errors.password.message}</span>}
      <input type="button" value={togglePassword ? "Hide" : "Show"} onClick={togglePasswordButton} className='absolute inset-y-0 bottom-1 right-3 pr-3 flex items-center cursor-pointer'/>
      </div>
      <div className=" flex justify-center mb-4">
      <button type="submit" className='btn btn-outline font-medium text-lg'>Register</button>
      </div>
      <div className=' flex justify-center '>
      <span className='mr-2 text-xl'>Already have an account?</span>
      <Link to='/login' className='text-lg font-medium hover:underline'>Login.</Link>
      </div>
    </form>
    </div>
    </div>
    </>
  );
};

export default Register;