import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { sessionsMiddleware } from './middleware/sessions.middleware';

const { BOT_TOKEN: token } = process.env;
@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessionsMiddleware],
      token: token,
    }),
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
