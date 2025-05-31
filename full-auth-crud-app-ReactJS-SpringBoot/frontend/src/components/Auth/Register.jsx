import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import api from '../../services/api';
import '../../pages/Register.css';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER', // ✅ Default to uppercase
    });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', form);
            setMsg(res.data.msg || 'Registration successful');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMsg(err.response?.data?.msg || 'Error occurred');
        }
    };

    return (
        <div className="register-page">
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card className="p-4 register-card shadow">
                    <Card.Body>
                        <h3 className="text-center mb-4">Register</h3>
                        {msg && <Alert variant="info">{msg}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
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

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Role</Form.Label>
                                <Form.Select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </Form.Select>
                            </Form.Group>

                            <Button type="submit" variant="success" className="w-100">
                                Register
                            </Button>

                            <Form.Text className="text-center d-block mt-3">
                                Already a member?{' '}
                                <span
                                    onClick={() => navigate('/login')}
                                    style={{ color: '#0d6efd', cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    Sign in here
                                </span>
                            </Form.Text>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
