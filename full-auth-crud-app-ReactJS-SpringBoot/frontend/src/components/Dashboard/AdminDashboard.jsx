import { useEffect, useState } from 'react';
import { fetchAllUsers, fetchAllEmployees } from '../../services/adminService';
import Navbar from '../Navbar';
import { Container, Row, Col, Card, Table, Alert } from 'react-bootstrap';
import '../../pages/AdminDashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const loadAdminData = async () => {
            try {
                const userRes = await fetchAllUsers();
                const empRes = await fetchAllEmployees();
                setUsers(userRes.data);
                setEmployees(empRes.data);
            } catch {
                setMsg('Error loading admin data');
            }
        };
        loadAdminData();
    }, []);

    return (
        <div className="admin-dashboard-bg">
            <Navbar />
            <Container className="py-4">
                <Row className="mb-4">
                    <Col>
                        <h2 className="text-white text-center fw-bold">Admin Dashboard</h2>
                        {msg && <Alert variant="danger">{msg}</Alert>}
                    </Col>
                </Row>

                <Row className="mb-5">
                    <Col>
                        <Card className="admin-card">
                            <Card.Header className="bg-primary text-white text-center fw-semibold">
                                Registered Users
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Table responsive hover className="mb-0">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Verified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u.id}>
                                                <td>{u.email}</td>
                                                <td>{u.role}</td>
                                                <td>{u.isVerified ? 'Yes' : 'No'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card className="admin-card">
                            <Card.Header className="bg-success text-white text-center fw-semibold">
                                All Employee Records
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Table responsive hover className="mb-0">
                                    <thead>
                                        <tr>
                                            <th>Employee Name</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Salary</th>
                                            <th>Created By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((emp) => (
                                            <tr key={emp.id}>
                                                <td>{emp.name}</td>
                                                <td>{emp.position}</td>
                                                <td>{emp.department}</td>
                                                <td>₹{emp.salary.toFixed(2)}</td>
                                                <td>{emp.createdBy?.email || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;
