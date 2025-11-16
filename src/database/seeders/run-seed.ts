import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { InitialSeeder } from './initial.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);

  try {
    const seeder = app.get(InitialSeeder);
    await seeder.run();
    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap();
