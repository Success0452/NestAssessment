import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { MigrationService } from "./database/migration.service";
import { EmailService } from "./resources/iam/services/email.service";
import { SeederService } from "./database/seeders/seeder.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("Assessment")
    .setDescription("Assessment API Documentation")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const migrationService = app.get(MigrationService);
  await migrationService.runMigrations();

  const seederService = app.get(SeederService);

  await seederService.seedData();

  const emailService = app.get(EmailService);

  await app.listen(3000);
  await emailService.initialize();
}
bootstrap().then(() => null);
