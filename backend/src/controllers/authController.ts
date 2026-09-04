import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const generateToken = (id: string, role: string, email: string, name: string) => {
  return jwt.sign({ id, role, email, name }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name, role, dept } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'STUDENT',
        dept,
      },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role, user.email, user.name),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        dept: user.dept,
        token: generateToken(user.id, user.role, user.email, user.name),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Admin account not found' });
    }

    if (user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied: You do not have administrator privileges.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role, user.email, user.name),
      message: 'Admin authentication successful',
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const seedDefaultAdmin = async (req?: Request, res?: Response) => {
  try {
    const defaultEmail = 'admin@cgec.org.in';
    const existingAdmin = await prisma.user.findUnique({ where: { email: defaultEmail } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Admin@cgec2026', 10);
      const newAdmin = await prisma.user.create({
        data: {
          email: defaultEmail,
          password: hashedPassword,
          name: 'CGEC Super Administrator',
          role: 'ADMIN',
        },
      });
      console.log('✅ Default Admin created: admin@cgec.org.in / Admin@cgec2026');
      if (res) return res.json({ message: 'Default Admin seeded successfully', admin: { email: newAdmin.email, name: newAdmin.name } });
    } else {
      if (res) return res.json({ message: 'Admin account already exists', email: existingAdmin.email });
    }
  } catch (error: any) {
    console.error('Seed Admin error:', error.message);
    if (res) res.status(500).json({ message: error.message });
  }
};
