import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { google } from 'googleapis';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Google')
@Controller('googleS')
export class GoogleController {

  @Get('google')
  googleAuth(@Res() res: Response) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL,
    );

    const scopes = ['https://www.googleapis.com/auth/calendar'];
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });

    res.redirect(url);
  }

  @Get('google/callback')
  async googleCallback(@Query('code') code: string, @Res() res: Response) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL,
    );

    const { tokens } = await oauth2Client.getToken(code);

    console.log('GOOGLE_REFRESH_TOKEN=', tokens.refresh_token);

    res.send('¡Autenticación exitosa! Copia el refresh token en tu .env');
  }
}
