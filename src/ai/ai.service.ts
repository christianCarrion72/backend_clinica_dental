import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import * as fs from 'fs';
import {
  AudioAnalysisResponseDto,
  ErrorResponseDto,
} from './dto/audio-analysis.dto';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey || apiKey === 'tu_openai_api_key_aqui') {
      throw new Error(
        'OPENAI_API_KEY no está configurada correctamente en el archivo .env',
      );
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async analyzeAudio(
    file: Express.Multer.File,
  ): Promise<AudioAnalysisResponseDto | ErrorResponseDto> {
    try {
      // Validar el archivo
      if (!file) {
        throw new BadRequestException(
          'No se proporcionó ningún archivo de audio',
        );
      }

      // Validar que el archivo existe físicamente
      if (!file.path || !fs.existsSync(file.path)) {
        throw new BadRequestException(
          'El archivo no se guardó correctamente en el servidor',
        );
      }

      // Validar tipo de archivo
      const allowedMimeTypes = [
        'audio/mpeg',
        'audio/mp3',
        'audio/wav',
        'audio/m4a',
        'audio/webm',
        'audio/ogg',
      ];

      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Formato de archivo no soportado. Use MP3, WAV, M4A, WebM u OGG',
        );
      }

      // Validar tamaño del archivo (máximo 25MB como límite de OpenAI)
      const maxSize = 25 * 1024 * 1024; // 25MB
      if (file.size > maxSize) {
        throw new BadRequestException(
          'El archivo es demasiado grande. Máximo 25MB permitido',
        );
      }

      // Transcribir el audio usando Whisper
      const transcription = await this.transcribeAudio(file);

      if (!transcription || transcription.trim() === '') {
        return {
          success: false,
          message: 'No se pudo transcribir el audio o el audio está vacío',
          error: 'TRANSCRIPTION_FAILED',
        };
      }

      // Analizar la transcripción con GPT para extraer información dental
      const analysis = await this.analyzeDentalContent(transcription);

      return analysis;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      return {
        success: false,
        message: 'Error interno del servidor al procesar el audio',
        error: error.message || 'UNKNOWN_ERROR',
      };
    }
  }

  private async transcribeAudio(file: Express.Multer.File): Promise<string> {
    try {
      // Verificar que el archivo existe
      if (!fs.existsSync(file.path)) {
        throw new BadRequestException(
          'El archivo no se encontró en el servidor',
        );
      }

      // Crear el archivo para OpenAI usando fs.createReadStream
      const transcription = await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(file.path),
        model: 'whisper-1',
        language: 'es', // Español
        response_format: 'text',
      });

      return transcription;
    } catch (error) {
      console.error('Error en transcripción:', error);
      throw new BadRequestException(
        'Error al transcribir el audio: ' + error.message,
      );
    }
  }

  private getNextWeekDate(): string {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    return nextWeek.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  private async analyzeDentalContent(
    transcription: string,
  ): Promise<AudioAnalysisResponseDto | ErrorResponseDto> {
    try {
      const nextWeekDate = this.getNextWeekDate();
      const today = new Date().toISOString().split('T')[0];

      const prompt = `
Eres un asistente especializado en análisis dental. Analiza la siguiente transcripción de una consulta dental y extrae información sobre planes de tratamiento y procedimientos realizados.

TRANSCRIPCIÓN: "${transcription}"

Debes responder ÚNICAMENTE con un JSON válido siguiendo esta estructura exacta:

{
  "planesTratamiento": [
    {
      "diagnosticoTratamiento": "string",
      "estado": "Pendiente" | "En Proceso" | "Completado",
      "pieza": "string (ej: 'Pieza 16', 'Todas', 'Arcada superior')",
      "precio": number
    }
  ],
  "procedimientos": [
    {
      "trabajoRealizado": "string",
      "proximaCita": "YYYY-MM-DD" (opcional),
      "planIndex": number (índice del plan relacionado, empezando en 0)
    }
  ]
}

REGLAS IMPORTANTES:
1. Si no hay información dental relevante, responde: {"error": "NO_DENTAL_CONTENT", "message": "La transcripción no contiene información dental relevante"}
2. VALORES POR DEFECTO cuando no se especifique:
   - estado: "Completado" (usar solo si el usuario menciona explícitamente otro estado)
   - precio: 0 (usar solo si el usuario menciona un precio específico)
   - pieza: "Todas las piezas" (usar solo si el usuario menciona una pieza específica)
   - proximaCita: "${nextWeekDate}" (una semana después de hoy ${today})
3. Los estados válidos son: "Pendiente", "En Proceso", "Completado"
4. planIndex debe corresponder al índice del plan de tratamiento (0, 1, 2...)
5. Si el usuario NO menciona fecha de próxima cita, usa "${nextWeekDate}"
6. Si el usuario NO menciona precio, usa 0
7. Si el usuario NO menciona estado, usa "Completado"
8. Si el usuario NO menciona pieza dental específica, usa "Todas las piezas"
9. IMPORTANTE: Si solo se menciona un diagnóstico SIN procedimientos específicos realizados, deja el array "procedimientos" vacío: []
10. Solo incluye procedimientos si se mencionan trabajos específicos realizados o planificados
11. Extrae toda la información dental mencionada, no solo lo explícito

EJEMPLOS:
- Si solo dice "Caries en pieza 16" → procedimientos: []
- Si dice "Se realizó limpieza dental" → incluir en procedimientos, pieza: "Todas las piezas"
- Si dice "Diagnóstico: gingivitis" → procedimientos: [], pieza: "Todas las piezas"
- Si dice "Problema en molar superior" → pieza: "Molar superior"
- Si dice "Extracción de la pieza 30" → pieza: "Pieza 30"
- Si dice "Se hizo extracción y se programó cita" → incluir en procedimientos

Respuesta:`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 2000,
      });

      const response = completion.choices[0]?.message?.content?.trim();

      if (!response) {
        return {
          success: false,
          message: 'No se recibió respuesta del análisis de IA',
          error: 'NO_AI_RESPONSE',
        };
      }

      try {
        const parsedResponse = JSON.parse(response);

        // Verificar si hay error en la respuesta
        if (parsedResponse.error) {
          return {
            success: false,
            message:
              parsedResponse.message ||
              'No se encontró contenido dental relevante',
            error: parsedResponse.error,
          };
        }

        // Validar estructura
        if (
          !parsedResponse.planesTratamiento ||
          !parsedResponse.procedimientos
        ) {
          return {
            success: false,
            message: 'Respuesta de IA con formato inválido',
            error: 'INVALID_AI_FORMAT',
          };
        }

        return parsedResponse as AudioAnalysisResponseDto;
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        return {
          success: false,
          message: 'Error al procesar la respuesta de IA',
          error: 'AI_PARSE_ERROR',
        };
      }
    } catch (error) {
      console.error('Error en análisis de contenido:', error);
      return {
        success: false,
        message: 'Error al analizar el contenido dental',
        error: error.message || 'ANALYSIS_ERROR',
      };
    }
  }
}
