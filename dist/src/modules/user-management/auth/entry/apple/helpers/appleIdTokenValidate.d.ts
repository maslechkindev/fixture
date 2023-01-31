import * as jwt from 'jsonwebtoken';
export default function (token: string): Promise<jwt.JwtPayload>;
