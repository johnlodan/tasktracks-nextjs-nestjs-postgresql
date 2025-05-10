import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BoardsDto } from './dto/boards.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, data: any) {
    return this.prisma.boards.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.boards.findMany({
      where: {
        userId,
      },
      include: {
        _count: {
          select: { stages: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.boards.findUnique({ where: { id } });
  }

  async update(id: string, data: BoardsDto) {
    return this.prisma.boards.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.boards.delete({ where: { id } });
  }
}
