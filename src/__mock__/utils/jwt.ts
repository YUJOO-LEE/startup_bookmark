import * as jose from 'jose';

const SECRET_KEY = new TextEncoder().encode('hunsinykaychamchrisstevenlucatene');

export const issueToken = async (email: string) => {
  return await new jose.SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('14d')
    .sign(SECRET_KEY);
};

export const decodeToken = async (token: string) => {
  const { payload } = await jose.jwtVerify(token, SECRET_KEY);
  return payload as { email: string };
};

export const extractTokenFromHeader = (value: string | null) => {
  if (typeof value === 'string' && value.startsWith('Bearer ')) {
    return value.substring(7, value.length);
  }
  return null;
};
