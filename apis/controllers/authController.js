import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import env from '../config/env.js';

const signToken = (id) => jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Champs manquants' });
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email déjà utilisé' });

    const user = await User.create({ name, email, password, role: 'reader' });
    const token = signToken(user.id);
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }
    if (!user.isActive) return res.status(403).json({ message: 'Compte désactivé' });

    const token = signToken(user.id);
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) { next(err); }
};

export const me = async (req, res) => res.json({ user: req.user });