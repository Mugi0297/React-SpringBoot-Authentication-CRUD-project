// src/components/Navbar.jsx
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AppNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-2">
            <Container fluid>
                <Navbar.Brand className="text-white fw-semibold">Employee Portal</Navbar.Brand>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
