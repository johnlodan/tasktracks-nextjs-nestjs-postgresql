import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { PrismaService } from './prisma/prisma.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { StagesController } from './stages/stages.controller';
import { StagesService } from './stages/stages.service';
import { StagesModule } from './stages/stages.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, BoardsModule, TasksModule, StagesModule],
  controllers: [AppController, TasksController, StagesController],
  providers: [AppService, PrismaService, TasksService, StagesService],
})
export class AppModule {}
