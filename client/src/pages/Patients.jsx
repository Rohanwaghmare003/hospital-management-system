import React, { useState } from 'react';

const initialPatients = [
  { id: 1, name: 'John Doe', age: 30, disease: 'Flu' },
  { id: 2, name: 'Jane Smith', age: 25, disease: 'Covid-19' },
];

function Patients() {
  const [patients, setPatients] = useState(initialPatients);
  const [form, setForm] = useState({ name: '', age: '', disease: '' });
  const [editing, setEditing] = useState(null);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Edit Patient
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      const updated = patients.map((p, idx) =>
        idx === editing ? { ...form, id: p.id } : p
      );
      setPatients(updated);
      setEditing(null);
    } else {
      setPatients([...patients, { ...form, id: Date.now() }]);
    }
    setForm({ name: '', age: '', disease: '' });
  };

  // Edit
  const handleEdit = (idx) => {
    setForm(patients[idx]);
    setEditing(idx);
  };

  // Delete
  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>Patients</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          name="disease"
          placeholder="Disease"
          value={form.disease}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing !== null ? 'Update' : 'Add'} Patient</button>
      </form>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, idx) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.disease}</td>
              <td>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 4 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Patients;
