import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed/seed.service';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Study Nest API')
    .setDescription('The Study Nest API description')
    .setVersion('1.0')
    .addTag('study')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const seedService = app.get(SeedService);
  if (await seedService.isDatabaseEmpty()) {
    await seedService.seed();
    console.log('默认数据已成功插入');
  }
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
