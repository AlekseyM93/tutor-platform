export class AppError extends Error {
  readonly code: string;
  readonly statusCode: number;

  constructor(message: string, code = 'APP_ERROR', statusCode = 400) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}
