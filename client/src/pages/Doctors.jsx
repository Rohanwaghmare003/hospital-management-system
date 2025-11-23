import React, { useState } from 'react';

const initialDoctors = [
  { id: 1, name: 'Dr. Adams', specialization: 'Physician' },
  { id: 2, name: 'Dr. Baker', specialization: 'Cardiologist' },
];

function Doctors() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [form, setForm] = useState({ name: '', specialization: '' });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      const updated = doctors.map((d, idx) =>
        idx === editing ? { ...form, id: d.id } : d
      );
      setDoctors(updated);
      setEditing(null);
    } else {
      setDoctors([...doctors, { ...form, id: Date.now() }]);
    }
    setForm({ name: '', specialization: '' });
  };

  const handleEdit = (idx) => {
    setForm(doctors[idx]);
    setEditing(idx);
  };

  const handleDelete = (id) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  return (
    <div>
      <h2>Doctors</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} required />
        <button type="submit">{editing !== null ? 'Update' : 'Add'} Doctor</button>
      </form>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d, idx) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.specialization}</td>
              <td>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(d.id)} style={{ marginLeft: 4 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
