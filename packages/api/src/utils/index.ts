import jwt from 'jsonwebtoken';

export const APP_SECRET = 'GraphQL-is-aw3some';

export function getTokenPayload(token: string) {
  return jwt.verify(token, APP_SECRET) as { userId: string };
}
