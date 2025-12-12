import { useState } from 'react';
import { api } from '../api';

function Login() {
  const [email, setEmail] = useState('admin@hospital.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      setMessage('Login successful');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '60px auto',
    padding: '30px',
    background: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    fontFamily: '"Poppins", sans-serif',
    animation: 'fadeIn 0.6s ease',
  };

  const headingStyle = {
    fontSize: '32px',
    color: '#0a66c2',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const formGroup = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0a66c2',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const messageStyle = {
    textAlign: 'center',
    marginBottom: '15px',
    color: message.includes('successful') ? 'green' : 'red',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Login</h1>
      {message && <p style={messageStyle}>{message}</p>}
      <form onSubmit={handleLogin}>
        <div style={formGroup}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroup}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      {token && <p style={{ textAlign: 'center', marginTop: '15px', color: 'green' }}>JWT Token Generated.</p>}

      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Login;
