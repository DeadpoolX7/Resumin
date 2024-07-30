import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResumePreview = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`/api/resume/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setResume(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching resume:', err);
        setError('Failed to fetch resume data');
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(`/api/resume/${id}/pdf`, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error downloading PDF:', err);
    }
  };

  if (loading) return <div className='loading loading-infinity loading-lg text-info flex flex-row min-h-screen justify-center items-center mx-auto'>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!resume) return <div>No resume data found</div>;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-3xl bg-white shadow-xl flex">
          {/* Left blue stripe */}
          <div className="w-2 bg-blue-600"></div>

          <div className="flex-1 p-8 font-sans">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{resume.name || 'Name not provided'}</h1>
            <p className="text-lg text-gray-600 mb-6">{resume.email || 'Email not provided'}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">{resume.about || 'About section not provided'}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-3">Skills</h2>
              <ul className="list-disc list-inside text-gray-700">
                {resume.skills && resume.skills.length > 0 ? (
                  (Array.isArray(resume.skills) ? resume.skills : resume.skills.split(','))
                    .map((skill, index) => (
                      <li key={index} className="mb-1">{skill.trim()}</li>
                    ))
                ) : (
                  <li>No skills listed</li>
                )}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-600 mb-3">Contact</h2>
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> {resume.phone || 'Phone not provided'}
              </p>
            </section>
            <div className='flex justify-center'>
              <button onClick={handleDownloadPDF} className='btn btn-success antialiased text-xl text-zinc-800 hover:text-gray-100 border-2 border-stone-600'>Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePreview;