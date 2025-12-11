import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Patients from './pages/Patients';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <nav style={{ padding: 10, borderBottom: '1px solid #ccc', marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/patients" style={{ marginRight: 10 }}>Patients</Link>
        <Link to="/contact" style={{ marginRight: 10 }}>Contact</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
