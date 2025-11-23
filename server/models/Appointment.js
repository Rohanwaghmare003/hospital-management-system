const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Patient = require('./Patient');
const Doctor = require('./Doctor');

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  patient_id: { type: DataTypes.INTEGER, references: { model: Patient, key: 'id' } },
  doctor_id: { type: DataTypes.INTEGER, references: { model: Doctor, key: 'id' } },
  appointment_date: { type: DataTypes.DATE },
  status: { type: DataTypes.STRING(20) }
}, {
  tableName: 'appointments',
  timestamps: false
});

Appointment.belongsTo(Patient, { foreignKey: 'patient_id' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id' });

module.exports = Appointment;
