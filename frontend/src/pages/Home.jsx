import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <div className='loading loading-spinner loading-lg text-info flex flex-row min-h-screen justify-center items-center mx-auto'></div>;

  return (
    <>
    <div className="hero bg-base-200 min-h-screen">
      <div  className="hero-content text-center ">
      <div className="max-w-md">
      <h1  className="text-5xl font-bold mb-5">Welcome, {user.name}!</h1>
      <p className='py-6 text-4xl hover:underline mb-5 link link-accent'>
      <Link to="/create-resume" >Create Resume! 📃</Link>
      </p>
      <button onClick={handleLogout} className='btn btn-error font-semibold text-lg'>Logout</button>
      </div>
      </div>
    </div>

    </>
  );
};

export default Home;