import { IsString, IsOptional } from 'class-validator';

export class BoardsDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    userId: string;
}
