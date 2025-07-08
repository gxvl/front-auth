// src/app/api/register/route.ts
import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/app/lib/mongoose';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, email, password } = await req.json();

    // Validação básica (mais validações podem ser adicionadas no UserSchema e aqui)
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Please enter all fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    // Checar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Criptografar senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Gerar token JWT (simulado)
    const token = jwt.sign({ id: newUser._id, name: newUser.name }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({
      message: 'User registered successfully',
      token,
      userName: newUser.name,
      userEmail: newUser.email,
    }, { status: 201 });

  } catch (error: any) {
    console.error(error);
    // Erros de validação do Mongoose podem ser tratados de forma mais específica aqui
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return NextResponse.json({ message: messages.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}