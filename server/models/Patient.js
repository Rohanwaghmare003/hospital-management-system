const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./User');

const Patient = sequelize.define('Patient', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  name: { type: DataTypes.STRING(100) },
  age: { type: DataTypes.INTEGER },
  gender: { type: DataTypes.STRING(10) },
  address: { type: DataTypes.STRING(255) }
}, {
  tableName: 'patients',
  timestamps: false
});

// Association (optional, for ORM usage)
Patient.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Patient;
