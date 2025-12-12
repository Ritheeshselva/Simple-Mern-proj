function Home() {
  const containerStyle = {
    maxWidth: '700px',
    margin: '60px auto',
    padding: '30px',
    background: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: '"Poppins", sans-serif',
    animation: 'fadeIn 0.6s ease',
  };

  const headingStyle = {
    fontSize: '36px',
    color: '#0a66c2',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '18px',
    marginBottom: '12px',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Hospital Management System</h1>
      <p style={paragraphStyle}>Welcome to the Hospital Management web app.</p>
      <p style={paragraphStyle}>Use the navigation above to manage patients or contact us.</p>

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

export default Home;
