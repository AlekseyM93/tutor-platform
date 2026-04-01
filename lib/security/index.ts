import { compare, hash } from 'bcryptjs';

export async function hashPassword(raw: string) {
  return hash(raw, 12);
}

export async function verifyPassword(raw: string, hashed: string) {
  return compare(raw, hashed);
}
