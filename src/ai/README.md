# Módulo de IA - Análisis de Audio Dental

## Descripción

Este módulo utiliza la API de OpenAI (Whisper + GPT-4) para transcribir y analizar audios de consultas dentales, extrayendo automáticamente información sobre planes de tratamiento y procedimientos.

## Configuración Inicial

### 1. API Key de OpenAI

Agrega tu API key real de OpenAI en el archivo `.env`:

```env
OPENAI_API_KEY=tu_api_key_real_de_openai
```

### 2. Directorio Temporal

El sistema creará automáticamente el directorio `./tmp/audio` para archivos temporales.

## Endpoints Disponibles

### 1. Análisis de Audio

**POST** `/ai/analyze-audio`

**Content-Type:** `multipart/form-data`

**Body:**

- `audio` (file): Archivo de audio (MP3, WAV, M4A, WebM, OGG)

**Respuesta Exitosa:**

```json
{
  "planesTratamiento": [
    {
      "diagnosticoTratamiento": "Caries en molar superior",
      "estado": "Pendiente",
      "pieza": "Pieza 16",
      "precio": 150.0
    }
  ],
  "procedimientos": [
    {
      "trabajoRealizado": "Evaluación inicial y toma de radiografías",
      "proximaCita": "2025-12-01",
      "planIndex": 0
    }
  ]
}
```

**Respuesta de Error:**

```json
{
  "success": false,
  "message": "No se encontró contenido dental relevante",
  "error": "NO_DENTAL_CONTENT"
}
```

### 2. Test de Conexión

**POST** `/ai/test-connection`

Verifica la conectividad con OpenAI.

## Formatos de Audio Soportados

- MP3 (.mp3)
- WAV (.wav)
- M4A (.m4a)
- WebM (.webm)
- OGG (.ogg)

**Límites:**

- Tamaño máximo: 25MB
- Duración recomendada: Máximo 10 minutos

## Ejemplos de Uso

### cURL

```bash
curl -X POST \
  http://localhost:3000/ai/analyze-audio \
  -H 'Content-Type: multipart/form-data' \
  -F 'audio=@consulta_dental.mp3'
```

### JavaScript (Fetch)

```javascript
const formData = new FormData();
formData.append('audio', audioFile);

fetch('/ai/analyze-audio', {
  method: 'POST',
  body: formData,
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### React con useUpload

```jsx
const handleAudioUpload = async (file) => {
  const formData = new FormData();
  formData.append('audio', file);

  try {
    const response = await fetch('/ai/analyze-audio', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.success === false) {
      console.error('Error:', result.message);
    } else {
      console.log('Planes de tratamiento:', result.planesTratamiento);
      console.log('Procedimientos:', result.procedimientos);
    }
  } catch (error) {
    console.error('Error uploading:', error);
  }
};
```

## Casos de Uso Típicos

### 1. Audio con Contenido Dental Válido

El sistema extraerá:

- Planes de tratamiento mencionados
- Procedimientos realizados o planificados
- Estados de tratamientos
- Piezas dentales afectadas
- Precios estimados

### 2. Audio sin Contenido Dental

```json
{
  "success": false,
  "message": "La transcripción no contiene información dental relevante",
  "error": "NO_DENTAL_CONTENT"
}
```

### 3. Errores de Transcripción

```json
{
  "success": false,
  "message": "No se pudo transcribir el audio o el audio está vacío",
  "error": "TRANSCRIPTION_FAILED"
}
```

## Estados de Tratamiento

- `"Pendiente"`: Tratamiento planificado pero no iniciado
- `"En Proceso"`: Tratamiento en curso
- `"Completado"`: Tratamiento finalizado

## Ejemplos de Piezas Dentales

- `"Pieza 16"`: Molar específico
- `"Todas"`: Tratamiento general
- `"Arcada superior"`: Parte superior
- `"Arcada inferior"`: Parte inferior
- `"Arcada completa"`: Ambas arcadas

## Manejo de Errores

### Errores Comunes

1. **Archivo no soportado**: Verificar formato de audio
2. **Archivo muy grande**: Máximo 25MB
3. **API Key inválida**: Verificar configuración en .env
4. **Audio sin contenido**: El audio no contiene información dental

### Debugging

1. Verificar conexión: `POST /ai/test-connection`
2. Revisar logs del servidor para errores detallados
3. Verificar que el audio sea claro y audible

## Integración con Otras Entidades

Los resultados del análisis pueden ser utilizados para:

1. Crear automáticamente planes de tratamiento
2. Registrar procedimientos realizados
3. Programar citas de seguimiento
4. Generar presupuestos

## Notas de Seguridad

- Los archivos de audio se eliminan automáticamente después del procesamiento
- No se almacena información permanente del audio
- La transcripción se procesa de forma segura a través de OpenAI
