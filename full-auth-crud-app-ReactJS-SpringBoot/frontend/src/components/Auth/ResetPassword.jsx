import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import api from '../../services/api';
import '../../pages/ForgotPassword.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Password strength validation
        if (password.length < 8 || !/\d/.test(password)) {
            setError("Password must be at least 8 characters and contain a number.");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post(`/auth/reset-password/${token}`, { password });
            setMsg(res.data.msg);
            setError('');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.msg || 'Something went wrong';
            setError(errorMsg);
            setMsg('');

            // ✅ Redirect user if token is expired/invalid
            if (errorMsg.toLowerCase().includes('expired') || errorMsg.toLowerCase().includes('invalid')) {
                setTimeout(() => navigate('/forgot-password'), 3000);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card className="p-4 login-card shadow">
                    <Card.Body>
                        <h3 className="text-center mb-4">Reset Password</h3>
                        {msg && <Alert variant="success">{msg}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter new secure password"
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ResetPassword;
