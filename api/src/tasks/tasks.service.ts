import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksDto } from './dto/tasks.dto';
import { UpdateRequestTasks } from './dto/updateRequestTasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: any) {
    return this.prisma.tasks.create({ data });
  }

  async findAll() {
    return this.prisma.tasks.findMany();
  }

  async findOne(id: string) {
    return this.prisma.tasks.findUnique({ where: { id } });
  }

  async update(id: string, data: TasksDto) {
    return this.prisma.tasks.update({ where: { id }, data });
  }

  async updateReOrder(data: UpdateRequestTasks) {
    const updated = await Promise.all(
      data?.taskIds?.map((taskId, i) => {
        return this.prisma.tasks.update({
          where: { id: taskId },
          data: {
            stageId: data?.stageId,
            order: i + 1,
          },
        });
      }),
    );

    return updated;
  }

  async delete(id: string) {
    return this.prisma.tasks.delete({ where: { id } });
  }
}
