const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./User');

const Doctor = sequelize.define('Doctor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  name: { type: DataTypes.STRING(100) },
  specialization: { type: DataTypes.STRING(100) }
}, {
  tableName: 'doctors',
  timestamps: false
});

Doctor.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Doctor;
