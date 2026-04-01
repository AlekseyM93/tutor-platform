type Level = 'info' | 'warn' | 'error';

function log(level: Level, message: string, meta?: unknown) {
  const payload = meta ? ` ${JSON.stringify(meta)}` : '';
  const line = `[${level.toUpperCase()}] ${message}${payload}`;
  if (level === 'error') {
    console.error(line);
    return;
  }
  if (level === 'warn') {
    console.warn(line);
    return;
  }
  console.log(line);
}

export const logger = {
  info: (message: string, meta?: unknown) => log('info', message, meta),
  warn: (message: string, meta?: unknown) => log('warn', message, meta),
  error: (message: string, meta?: unknown) => log('error', message, meta)
};
