import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Accesible en toda la App (.env)
    }),
    DatabaseModule,
    UsersModule,
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
