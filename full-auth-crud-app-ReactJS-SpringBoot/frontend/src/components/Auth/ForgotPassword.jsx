import { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import api from '../../services/api';
import '../../pages/ForgotPassword.css';

const COOLDOWN_SECONDS = 30;
const STORAGE_KEY = 'forgotPasswordLastRequest';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    // Check on mount if a recent request was made
    useEffect(() => {
        const lastRequestTime = localStorage.getItem(STORAGE_KEY);
        if (lastRequestTime) {
            const elapsed = Math.floor((Date.now() - parseInt(lastRequestTime)) / 1000);
            const remaining = COOLDOWN_SECONDS - elapsed;
            if (remaining > 0) {
                setCooldown(remaining);
            }
        }
    }, []);

    // Run countdown timer
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
        } else {
            localStorage.removeItem(STORAGE_KEY); // Cleanup after cooldown
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            setMsg('');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/auth/forgot-password', { email });
            setMsg(res.data.msg || 'Reset link sent successfully.');
            setError('');
            const now = Date.now();
            localStorage.setItem(STORAGE_KEY, now.toString());
            setCooldown(COOLDOWN_SECONDS);
        } catch (err) {
            setError(err.response?.data?.msg || 'Something went wrong. Please try again.');
            setMsg('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card className="p-4 login-card shadow">
                    <Card.Body>
                        <h3 className="text-center mb-4">Forgot Password</h3>
                        {msg && <Alert variant="success">{msg}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={cooldown > 0}
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100"
                                disabled={loading || cooldown > 0}
                            >
                                {loading
                                    ? 'Sending...'
                                    : cooldown > 0
                                        ? `Please wait ${cooldown}s`
                                        : 'Send Reset Link'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default ForgotPassword;
