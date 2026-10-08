const axios = require('axios');

const test = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      email: 'admin@example.com',
      password: 'Admin123',
      role: 'admin',
      name: 'Admin User'
    });
    console.log('Register:', res.data);
  } catch (e) {
    console.log('Register error:', e.response?.data || e.message);
  }
  
  // Wait a bit before login
  await new Promise(r => setTimeout(r, 500));
  
  try {
    const res2 = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@example.com',
      password: 'Admin123',
      role: 'admin'
    });
    console.log('Login:', res2.data);
  } catch (e) {
    console.log('Login error:', e.response?.data || e.message);
  }
  
  process.exit(0);
};

test();
