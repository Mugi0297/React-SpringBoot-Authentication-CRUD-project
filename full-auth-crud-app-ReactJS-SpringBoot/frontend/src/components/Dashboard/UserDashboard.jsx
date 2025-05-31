import { useEffect, useState } from 'react';
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from '../../services/employeeService';

import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import Navbar from '../Navbar';
import { Container, Card, Alert, Row, Col } from 'react-bootstrap';
import '../../pages/UserDashboard.css';

const UserDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [editData, setEditData] = useState(null);
    const [msg, setMsg] = useState('');

    const fetchEmployees = async () => {
        try {
            const res = await getEmployees();
            setEmployees(res.data);
        } catch {
            setMsg('Failed to fetch employees');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSave = async (data) => {
        try {
            if (editData) {
                const token = localStorage.getItem('token');
                console.log("🔐 JWT Token (before PUT):", token);

                const res = await updateEmployee(editData.id, data);
                console.log("✅ PUT Response:", res);
                setMsg('Employee updated successfully');
            } else {
                const res = await createEmployee(data);
                console.log("✅ POST Response:", res);
                setMsg('Employee added successfully');
            }
            setTimeout(() => {
                setEditData(null);
                fetchEmployees();
            }, 300); // Optional small delay so msg shows before reload

        } catch (err) {
            console.error('❌ Save Error:', err.response?.data || err.message);
            setMsg('Error saving employee');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await deleteEmployee(id);
                setMsg('Employee deleted successfully');
                fetchEmployees();
            } catch {
                setMsg('Error deleting employee');
            }
        }
    };

    return (
        <div className="user-dashboard-bg">
            <Navbar />
            <Container className="py-5">
                <h2 className="text-center mb-4 text-white fw-bold">User Dashboard</h2>

                {msg && <Alert variant="info">{msg}</Alert>}

                <Row className="justify-content-center mb-4">
                    <Col md={10}>
                        <Card className="p-4 shadow rounded-4 bg-light">
                            <EmployeeForm onSave={handleSave} editData={editData} />
                        </Card>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={10}>
                        <Card className="p-4 shadow rounded-4 bg-white">
                            <EmployeeList
                                employees={employees}
                                onEdit={setEditData}
                                onDelete={handleDelete}
                            />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserDashboard;
