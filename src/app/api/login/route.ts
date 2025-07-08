import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/app/lib/mongoose';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Please enter all fields' }, { status: 400 });
    }

    // Encontrar usuário (selecionando a senha)
    const user = await User.findOne({ email }).select('+password'); // Seleciona a senha para comparação
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    // Comparar senhas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({
      message: 'Logged in successfully',
      token,
      userName: user.name,
      userEmail: user.email,
    }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}