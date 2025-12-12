import { useState, useEffect } from 'react';
import { api } from '../api';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    pid: '',
    pname: '',
    age: '',
    address: '',
    d_id: '',
    d_name: '',
  });
  const [message, setMessage] = useState('');

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients');
      setPatients(res.data);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to load patients');
    }
  };

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...newPatient,
        pid: Number(newPatient.pid),
        age: Number(newPatient.age),
        d_id: Number(newPatient.d_id),
      };
      const res = await api.post('/patients', body);
      setPatients((prev) => [...prev, res.data]);
      setNewPatient({
        pid: '',
        pname: '',
        age: '',
        address: '',
        d_id: '',
        d_name: '',
      });
      setMessage('Patient created');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to create patient');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p._id !== id));
      setMessage('Patient deleted');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to delete patient');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // --- Inline styles ---
  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
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

  const sectionStyle = {
    marginBottom: '30px',
  };

  const inputStyle = {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0a66c2',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thStyle = {
    padding: '10px',
    borderBottom: '2px solid #0a66c2',
    textAlign: 'left',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const messageStyle = {
    textAlign: 'center',
    marginBottom: '15px',
    color: message.includes('created') || message.includes('deleted') ? 'green' : 'red',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Patients</h1>
      {message && <p style={messageStyle}>{message}</p>}

      <section style={sectionStyle}>
        <h2>Add Patient</h2>
        <form onSubmit={handleCreatePatient}>
          <input
            style={inputStyle}
            placeholder="PID"
            value={newPatient.pid}
            onChange={(e) => setNewPatient({ ...newPatient, pid: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Name"
            value={newPatient.pname}
            onChange={(e) => setNewPatient({ ...newPatient, pname: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Address"
            value={newPatient.address}
            onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Doctor ID"
            value={newPatient.d_id}
            onChange={(e) => setNewPatient({ ...newPatient, d_id: e.target.value })}
          />
          <input
            style={inputStyle}
            placeholder="Doctor Name"
            value={newPatient.d_name}
            onChange={(e) => setNewPatient({ ...newPatient, d_name: e.target.value })}
          />
          <button type="submit" style={buttonStyle}>
            Add Patient
          </button>
        </form>
      </section>

      <section>
        <h2>Patient List</h2>
        {patients.length === 0 ? (
          <p>No patients yet</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>PID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Age</th>
                <th style={thStyle}>Address</th>
                <th style={thStyle}>Doctor</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p._id}>
                  <td style={tdStyle}>{p.pid}</td>
                  <td style={tdStyle}>{p.pname}</td>
                  <td style={tdStyle}>{p.age}</td>
                  <td style={tdStyle}>{p.address}</td>
                  <td style={tdStyle}>{p.d_name}</td>
                  <td style={tdStyle}>
                    <button style={buttonStyle} onClick={() => handleDelete(p._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Inline keyframes for fadeIn */}
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

export default Patients;
