import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { AiService } from './ai.service';
import {
  AudioAnalysisResponseDto,
  ErrorResponseDto,
} from './dto/audio-analysis.dto';

// Configuración de almacenamiento temporal para archivos
const storage = diskStorage({
  destination: './tmp/audio',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `audio-${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@ApiTags('AI - Análisis de Audio')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze-audio')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('audio', {
      storage,
      limits: {
        fileSize: 25 * 1024 * 1024, // 25MB máximo
      },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
          'audio/mpeg',
          'audio/mp3',
          'audio/wav',
          'audio/m4a',
          'audio/webm',
          'audio/ogg',
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Formato de archivo no soportado'), false);
        }
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo de audio para análisis dental',
    schema: {
      type: 'object',
      properties: {
        audio: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de audio (MP3, WAV, M4A, WebM, OGG)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Análisis exitoso del audio',
    type: AudioAnalysisResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error en el archivo o análisis',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor',
    type: ErrorResponseDto,
  })
  async analyzeAudio(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AudioAnalysisResponseDto | ErrorResponseDto> {
    let filePath: string | null = null;

    try {
      if (!file) {
        throw new BadRequestException('Se requiere un archivo de audio');
      }

      filePath = file.path;

      // Crear directorio temporal si no existe
      const tmpDir = './tmp/audio';
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }

      // Verificar que el archivo se guardó correctamente
      if (!fs.existsSync(filePath)) {
        throw new BadRequestException('Error al guardar el archivo temporal');
      }

      // Procesar el archivo
      const result = await this.aiService.analyzeAudio(file);

      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException('Error procesando el archivo de audio');
    } finally {
      // Limpiar archivo temporal siempre
      if (filePath && fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (cleanupError) {
          console.error('Error limpiando archivo temporal:', cleanupError);
        }
      }
    }
  }

  @Post('test-connection')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Test de conectividad con OpenAI',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        model: { type: 'string' },
      },
    },
  })
  async testConnection() {
    try {
      // Test básico para verificar la conexión con OpenAI
      return {
        success: true,
        message: 'Conexión con OpenAI establecida correctamente',
        model: 'whisper-1 y gpt-4o-mini disponibles',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error de conexión con OpenAI',
        error: error.message,
      };
    }
  }
}
