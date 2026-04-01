export type AuthActionState = {
  error?: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: 'TUTOR' | 'STUDENT';
};
