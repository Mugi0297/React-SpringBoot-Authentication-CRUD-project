import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const EmployeeForm = ({ onSave, editData }) => {
    const [form, setForm] = useState({
        name: '',
        position: '',
        department: '',
        salary: ''
    });

    useEffect(() => {
        if (editData) setForm(editData);
    }, [editData]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...form, salary: parseFloat(form.salary) }); // Convert salary to number
        setForm({ name: '', position: '', department: '', salary: '' });
    };

    return (
        <Form onSubmit={handleSubmit} className="p-3 border rounded bg-light shadow-sm">
            <h5 className="mb-3">{editData ? 'Edit Employee' : 'Add Employee'}</h5>

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={form.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control name="position" value={form.position} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control name="department" value={form.department} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
                {editData ? 'Update' : 'Save'}
            </Button>
        </Form>
    );
};

export default EmployeeForm;
