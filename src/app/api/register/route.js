import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    // console.log('Name:', name);
    // console.log('Email:', email);
    // console.log('Password:', password);
    const hashPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({ name, email, password: hashPassword });

    return NextResponse.json({ msg: 'User registered' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ msg: 'An error occured while registering the user.' }, { status: 500 });
  }
}
