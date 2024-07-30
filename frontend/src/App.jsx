import { Routes, Route } from 'react-router-dom';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import Footer from './components/Footer';
import Error from './pages/Error'

function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-resume" element={<ResumeForm />} />
        <Route path="/preview/:id" element={<ResumePreview />} />
        <Route path="*" element={<Error />}/>
    </Routes>
    <Footer />
    </>
  );
}

export default App;