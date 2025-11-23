import React, { useState } from 'react';

const initialAppointments = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Adams', date: '2025-11-23', status: 'Scheduled' },
];

function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [form, setForm] = useState({ patient: '', doctor: '', date: '', status: '' });
  const [editing, setEditing] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing !== null) {
      const updated = appointments.map((a, idx) =>
        idx === editing ? { ...form, id: a.id } : a
      );
      setAppointments(updated);
      setEditing(null);
    } else {
      setAppointments([...appointments, { ...form, id: Date.now() }]);
    }
    setForm({ patient: '', doctor: '', date: '', status: '' });
  };

  const handleEdit = (idx) => {
    setForm(appointments[idx]);
    setEditing(idx);
  };

  const handleDelete = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input name="patient" placeholder="Patient" value={form.patient} onChange={handleChange} required />
        <input name="doctor" placeholder="Doctor" value={form.doctor} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} required />
        <button type="submit">{editing !== null ? 'Update' : 'Add'} Appointment</button>
      </form>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, idx) => (
            <tr key={a.id}>
              <td>{a.patient}</td>
              <td>{a.doctor}</td>
              <td>{a.date}</td>
              <td>{a.status}</td>
              <td>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(a.id)} style={{ marginLeft: 4 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Appointments;
