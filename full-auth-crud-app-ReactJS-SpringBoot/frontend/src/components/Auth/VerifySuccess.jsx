// src/components/Auth/VerifySuccess.jsx
import { Link } from 'react-router-dom';
import '../../pages/VerifyPage.css';

const VerifySuccess = () => {
    return (
        <div className="verify-container bg-success-subtle text-success text-center">
            <div className="verify-icon">✅</div>
            <h2>Email Verified Successfully!</h2>
            <p>You can now log in to your account.</p>
            <Link to="/login" className="btn btn-success mt-3">
                Back to Login
            </Link>
        </div>
    );
};

export default VerifySuccess;
