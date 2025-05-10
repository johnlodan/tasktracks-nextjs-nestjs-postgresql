import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StagesDto } from './dto/stages.dto';

@Injectable()
export class StagesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: any) {
    const getLatestData = await this.prisma.stages.findFirst({
      where: {
        boardId: data?.boardId,
      },
      orderBy: {
        order: 'desc',
      },
    });

    return this.prisma.stages.create({
      data: {
        ...data,
        order: (getLatestData?.order || 0) + 1,
      },
    });
  }

  async findAll() {
    return this.prisma.stages.findMany({
      include: {
        tasks: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async findAllByBoardId(boardId: string) {
    return this.prisma.stages.findMany({
      where: {
        boardId,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.stages.findUnique({ where: { id } });
  }

  async update(id: string, data: StagesDto) {
    return this.prisma.stages.update({ where: { id }, data });
  }

  async updateOrders(ids: string[]) {
    const updatedStages = await Promise.all(
      ids.map((id, index) => {
        return this.prisma.stages.update({
          where: { id },
          data: { order: index + 1 },
        });
      }),
    );
    return updatedStages;
  }

  async delete(id: string) {
    return this.prisma.stages.delete({ where: { id } });
  }
}
