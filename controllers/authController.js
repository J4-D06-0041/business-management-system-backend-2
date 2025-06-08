const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed, role });

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };