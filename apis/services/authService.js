import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import env from '../config/env.js';

export const signToken = (id) =>
  jwt.sign({ id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES });

export const findUserByEmail = (email) => User.findOne({ where: { email } });

export const sanitizeUser = (user) => {
  const { password, ...safe } = user.toJSON ? user.toJSON() : user;
  return safe;
};