console.log("RUNNING server.js from:", __filename, "at", new Date().toLocaleString());


const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT secret
const JWT_SECRET = 'rohan123'; // For production, use process.env.JWT_SECRET

// Models and DB
const sequelize = require('./models/db');
const User = require('./models/User');
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const Document = require('./models/Document');

// Allowed roles for ENUM
const ALLOWED_ROLES = ['super_admin', 'admin', 'doctor', 'patient', 'nurse', 'receptionist'];

// JWT Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// DB Connect
sequelize.authenticate()
  .then(() => console.log('Connection to database successful!'))
  .catch(err => console.error('Unable to connect to database:', err));
sequelize.sync().then(() => console.log('Database synced!'));

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hospital Management System Backend Running');
});

// Register user (supports all allowed roles)
app.post('/register', [
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(ALLOWED_ROLES).withMessage(`Role must be one of: ${ALLOWED_ROLES.join(', ')}`)
], async (req, res) => {
  console.log("Register request incoming:", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation error in register:", errors.array());
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check for duplicate username
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      console.error("Registration error: username already exists");
      return res.status(409).json({ error: "Username already taken" });
    }
    const user = await User.create({ username, password: hashedPassword, role });
    console.log("User registered:", user.username, user.role);
    res.status(201).json({ message: "User registered", user: { id: user.id, username: user.username, role: user.role }});
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// Login route
app.post('/login', async (req, res) => {
  console.log("Login attempt:", req.body.username);

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      console.error("Login error: user not found");
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Login error: invalid password");
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

// All extra CRUD routes remain the same (patients, doctors, etc.)

app.listen(8600, () => {
  console.log('Server started on port 8600');
});
