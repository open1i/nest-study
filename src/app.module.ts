import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CardController } from './card/card.controller';
import { NavItemController } from './nav-item/nav-item.controller';
import { AppService } from './app.service';
import { SeedService } from './seed/seed.service';
import { CardModule } from './card/card.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    CardModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController, NavItemController],
  providers: [AppService, SeedService],
})
export class AppModule {}
