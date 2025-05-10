import { IsString, IsOptional, IsUUID, IsInt } from 'class-validator';

export class TasksDto {
    @IsUUID()
    id?: string;

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    stageId: string;

    @IsInt()
    @IsOptional()
    order?: number;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;
}