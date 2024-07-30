import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { API_URL } from '../config/config';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, data);
      localStorage.setItem('token', response.data.token);
      setToast({message:response.data.message, type:'succcess'});
      navigate('/');
    } catch (error) {
      
      setToast({message: error.response.data.message, type: 'info'});
      console.error('Login error:', error.response.data);
      
    }
  };
  const togglePassword = ()=> {
    if(showPassword === false){
      setShowPassword(true);
    }else{
      setShowPassword(false)
    }
  }
  return (
    <>
    <div className='h-screen flex flex-col mx-auto items-center justify-center'>
    {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className=' p-10 shadow-lg lg:border-2 border-slate-600 rounded-lg '>
      <h1 className='mb-7 text-center font-extrabold text-4xl '>Login to Resumin</h1>
    <form onSubmit={handleSubmit(onSubmit)} className='px-20 pb-10'>
      <div className='mb-5'>
      <input 
        {...register("email", { required: "Email is required" })} 
        placeholder="Email" 
        className='input input-bordered input-primary '
      />
      {errors?.email && <span>{errors.email.message}</span>}
      </div>
      <div className='mb-5 relative'>
      <input 
        type= {showPassword ? "text" : "password"}
        {...register("password", { 
          required: "Password is required",
         })} 
        placeholder="Password" 
        className='input input-bordered input-primary w-full'
      />
      {errors.password && <span>{errors.password.message}</span>}
      <input type="button" value={showPassword ? "Hide" : "Show"} onClick={togglePassword} className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'/>
      </div>
      <div className='mx-auto flex justify-center mb-4'>
      <button type="submit" className='btn btn-secondary btn-sm font-semibold '>Login</button>
      </div>
      <div className='mx-auto flex justify-center '>
      <span className='mr-2 text-xl'>No account?</span>
      <Link to='/register' className='text-lg font-medium hover:underline'>Register one.</Link>
      </div>
    </form>
    </div>
    </div>
    </>
  );
};

export default Login;