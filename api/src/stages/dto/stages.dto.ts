import { IsString, IsOptional, IsUUID, IsInt } from 'class-validator';

export class StagesDto {
  @IsUUID()
  id?: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  boardId: string;

  @IsString()
  userId: string;

  @IsInt()
  @IsOptional()
  order?: number;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
