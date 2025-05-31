// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import api from '../../services/api';
import '../../pages/Login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      const { token, role, email } = res.data;

      // ✅ Store role in uppercase for consistent checks
      localStorage.setItem('token', token);
      localStorage.setItem('role', role.toUpperCase());
      localStorage.setItem('email', email);

      // ✅ Redirect based on normalized role
      if (role.toUpperCase() === 'ADMIN') {
        navigate('/admin-dashboard');
      } else if (role.toUpperCase() === 'USER') {
        navigate('/user-dashboard');
      } else {
        setMsg('Unknown role. Contact admin.');
      }
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="p-4 login-card shadow">
          <Card.Body>
            <h3 className="text-center mb-4">Login</h3>
            {msg && <Alert variant="danger">{msg}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Login
              </Button>

              <div className="text-center mt-3">
                <Link to="/forgot-password" style={{ color: '#0d6efd' }}>
                  Forgot Password?
                </Link>
              </div>

              <Form.Text className="text-center d-block mt-3">
                Not a member?{' '}
                <span
                  onClick={() => navigate('/register')}
                  style={{
                    color: '#0d6efd',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Sign up here
                </span>
              </Form.Text>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
