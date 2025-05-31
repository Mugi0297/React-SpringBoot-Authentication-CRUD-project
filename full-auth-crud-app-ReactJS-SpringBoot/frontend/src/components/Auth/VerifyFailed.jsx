// src/components/Auth/VerifyFailed.jsx
import { Link } from 'react-router-dom';
import '../../pages/VerifyPage.css';

const VerifyFailed = () => {
    return (
        <div className="verify-container bg-danger-subtle text-danger text-center">
            <div className="verify-icon">❌</div>
            <h2>Verification Failed</h2>
            <p>Token is invalid or expired. Please try again.</p>
            <Link to="/login" className="btn btn-danger mt-3">
                Back to Login
            </Link>
        </div>
    );
};

export default VerifyFailed;
