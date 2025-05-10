import { Controller, Get, Post, Body, Param, Patch, Delete, Put, UseGuards } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StagesDto } from './dto/stages.dto';
import { UpdateOrderStagesDto } from './dto/stagesOrderIds.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('stages')
export class StagesController {
    constructor(private readonly service: StagesService) { }

    @Post()
    create(@Body() data: StagesDto) {
        return this.service.create(data);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':boardId')
    findAllByBoardId(@Param('boardId') boardId: string) {
        return this.service.findAllByBoardId(boardId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: StagesDto) {
        return this.service.update(id, data);
    }

    @Put()
    updateOrder(@Body() data: UpdateOrderStagesDto) {
        return this.service.updateOrders(data?.ids);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.service.delete(id);
    }
}
