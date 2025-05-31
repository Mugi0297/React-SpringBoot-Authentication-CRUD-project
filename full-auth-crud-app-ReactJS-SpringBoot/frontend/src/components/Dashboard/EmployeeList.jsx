import { Table, Button } from 'react-bootstrap';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
    return (
        <div className="table-responsive border rounded p-3 bg-white shadow-sm">
            <h5 className="mb-3">Employee List</h5>
            <Table striped bordered hover responsive>
                <thead className="table-primary">
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th style={{ width: '150px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.name}</td>
                                <td>{emp.position}</td>
                                <td>{emp.department}</td>
                                <td>₹{emp.salary.toFixed(2)}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onEdit(emp)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => onDelete(emp.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default EmployeeList;
