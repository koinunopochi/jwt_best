import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const SECRET_KEY = 'your-secret-key';

export async function POST(request) {
  const { username, password } = await request.json();

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, SECRET_KEY);

    const responseBody = JSON.stringify({ token });

    const responseHeaders = {
      'Set-Cookie': serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/',
      }),
      'Content-Type': 'application/json',
    };

    return new Response(responseBody, {
      status: 200,
      headers: responseHeaders,
    });
  } else {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
