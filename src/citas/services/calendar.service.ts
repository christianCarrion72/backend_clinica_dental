import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cita } from '../entities/cita.entity';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class CalendarService {
  private readonly logger = new Logger(CalendarService.name);
  private oauth2Client: OAuth2Client;
  private calendar: any;

  constructor() {
    this.initializeGoogleCalendar();
  }

  private initializeGoogleCalendar() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

    if (!clientId || !clientSecret || !redirectUrl) {
      this.logger.error('Falta configurar las variables de Google Calendar');
      throw new BadRequestException(
        'Google Calendar no está configurado correctamente',
      );
    }

    this.oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

    this.calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  private async getAccessToken(): Promise<string> {
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!refreshToken) {
      throw new BadRequestException(
        'Token de Google no configurado. Por favor, autenticarse primero.',
      );
    }

    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      return credentials.access_token!;
    } catch (error) {
      this.logger.error('Error al refrescar el token de Google', error);
      throw new BadRequestException('Error al autenticar con Google Calendar');
    }
  }

  async agregarAlCalendario(cita: Cita) {
    try {
      await this.getAccessToken();

      const calendarId = process.env.GOOGLE_CALENDAR_ID;

      const fechaStr =
        cita.horarioFecha.fecha instanceof Date
          ? cita.horarioFecha.fecha.toISOString().split('T')[0]
          : cita.horarioFecha.fecha;

      const [horas, minutos] = cita.horarioFecha.horario.horaInicio.split(':');
      const [horasFin, minutosFin] =
        cita.horarioFecha.horario.horaFin.split(':');

      const fechaInicioStr = `${fechaStr}T${horas}:${minutos}:00`;
      const fechaFinStr = `${fechaStr}T${horasFin}:${minutosFin}:00`;

      const attendees = cita.paciente.email
        ? [{ email: cita.paciente.email }]
        : [];

      const event = {
        summary: `Cita - ${cita.paciente.nombre}`,
        description: `Paciente: ${cita.paciente.nombre}\nConsultorio: ${cita.consultorio}\nObservaciones: ${cita.observaciones}`,
        start: {
          dateTime: fechaInicioStr,
          timeZone: 'America/La_Paz',
        },
        end: {
          dateTime: fechaFinStr,
          timeZone: 'America/La_Paz',
        },
        ...(attendees.length > 0 && { attendees }),
      };

      const response = await this.calendar.events.insert({
        calendarId: calendarId,
        resource: event,
      });

      cita.externalEventId = response.data.id;
      this.logger.log(
        `Cita agregada a Google Calendar con ID: ${response.data.id}`,
      );

      return response.data;
    } catch (error) {
      this.logger.error('Error al agregar cita a Google Calendar', error);
      throw new BadRequestException('No se pudo agregar la cita al calendario');
    }
  }

  async actualizarCalendario(cita: Cita) {
    try {
      if (!cita.externalEventId) {
        this.logger.warn(`Cita ${cita.id} no tiene externalEventId`);
        return;
      }

      await this.getAccessToken();

      const calendarId = process.env.GOOGLE_CALENDAR_ID;

      const fechaStr =
        cita.horarioFecha.fecha instanceof Date
          ? cita.horarioFecha.fecha.toISOString().split('T')[0]
          : cita.horarioFecha.fecha;

      const [horas, minutos] = cita.horarioFecha.horario.horaInicio.split(':');
      const [horasFin, minutosFin] =
        cita.horarioFecha.horario.horaFin.split(':');

      const fechaInicioStr = `${fechaStr}T${horas}:${minutos}:00`;
      const fechaFinStr = `${fechaStr}T${horasFin}:${minutosFin}:00`;

      const attendees = cita.paciente.email
        ? [{ email: cita.paciente.email }]
        : [];

      const event = {
        summary: `Cita - ${cita.paciente.nombre}`,
        description: `Paciente: ${cita.paciente.nombre}\nConsultorio: ${cita.consultorio}\nObservaciones: ${cita.observaciones}`,
        start: {
          dateTime: fechaInicioStr,
          timeZone: 'America/La_Paz',
        },
        end: {
          dateTime: fechaFinStr,
          timeZone: 'America/La_Paz',
        },
        ...(attendees.length > 0 && { attendees }),
      };

      const response = await this.calendar.events.update({
        calendarId: calendarId,
        eventId: cita.externalEventId,
        resource: event,
      });

      this.logger.log(
        `Cita actualizada en Google Calendar: ${cita.externalEventId}`,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error al actualizar cita en Google Calendar', error);
      throw new BadRequestException(
        'No se pudo actualizar la cita en el calendario',
      );
    }
  }

  async eliminarDeCalendario(cita: Cita) {
    try {
      if (!cita.externalEventId) {
        this.logger.warn(`Cita ${cita.id} no tiene externalEventId`);
        return;
      }

      await this.getAccessToken();

      const calendarId = process.env.GOOGLE_CALENDAR_ID;

      await this.calendar.events.delete({
        calendarId: calendarId,
        eventId: cita.externalEventId,
      });

      this.logger.log(
        `Cita eliminada de Google Calendar: ${cita.externalEventId}`,
      );
    } catch (error) {
      this.logger.error('Error al eliminar cita de Google Calendar', error);
      throw new BadRequestException(
        'No se pudo eliminar la cita del calendario',
      );
    }
  }
}
