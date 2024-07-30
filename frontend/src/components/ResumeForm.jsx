import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ResumeForm = () => {
  const { register, handleSubmit, formState:{errors}, } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
   try {
      const response = await axios.post('/api/resume', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Redirect to resume preview page
      window.location.href = `/preview/${response.data.resumeId}`;
    } catch (error) {
      console.error('Error submitting resume:', error);
    } 
  };

  return (
    <>
    <div  className="hero bg-base-200 min-h-screen">
     <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
      <input {...register('name', {required:true})}
       placeholder="Name"
        className="input input-bordered"
       aria-invalid={errors.name ? "true" : "false"
       }
       />
      {errors.name?.type === 'required' && <p role='alert'>FullName is required</p>}
      <textarea {...register('about', {required:true})} placeholder="About"  className='textarea textarea-info' />
      <input {...register('skills', {required:true})} placeholder="Skills (comma-separated)"  className="input input-bordered" />
      <input {...register('email', {required:true})} type="email" placeholder="Email"  className="input input-bordered"/>
      <input {...register('phone', {required:true})} type="tel" placeholder="Phone"  className="input input-bordered" />
      <button type="submit" className='btn btn-primary'>Generate Resume</button>
    </form>
    </div>
    </div>
    </>
  );
};

export default ResumeForm;