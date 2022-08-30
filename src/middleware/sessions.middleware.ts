import * as LocalSession from 'telegraf-session-local';

export const sessionsMiddleware = new LocalSession({
  database: 'session_db.json',
}).middleware();
