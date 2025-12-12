function Contact() {
  const containerStyle = {
    maxWidth: '500px',
    margin: '60px auto',
    padding: '30px',
    background: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
    fontFamily: '"Poppins", sans-serif',
    animation: 'fadeIn 0.6s ease',
  };

  const headingStyle = {
    fontSize: '32px',
    color: '#0a66c2',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const paragraphStyle = {
    fontSize: '18px',
    marginBottom: '12px',
    color: '#333',
  };

  const strongStyle = {
    color: '#0a66c2',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact</h1>
      <p style={paragraphStyle}>
        <strong style={strongStyle}>Phone:</strong> +91-98765-43210
      </p>
      <p style={paragraphStyle}>
        <strong style={strongStyle}>Email:</strong> hospital.support@example.com
      </p>

      {/* Keyframes in inline style */}
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

export default Contact;
