// src/components/Auth/VerifyEmail.jsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.get(`http://localhost:8080/api/auth/verify-email?token=${token}`)
                .then(() => {
                    navigate('/verify-success');
                })
                .catch(() => {
                    navigate('/verify-failed');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate('/verify-failed');
        }
    }, [token, navigate]);

    return (
        <div className="verify-container text-center">
            <h2>{loading ? "Verifying your email..." : "Redirecting..."}</h2>
        </div>
    );
};

export default VerifyEmail;
