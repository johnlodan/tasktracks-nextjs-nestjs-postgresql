import { IsArray, IsUUID } from 'class-validator';

export class StagesOrderIdsDto {
  @IsUUID()
  id?: string;
}

export class UpdateOrderStagesDto {
  @IsArray()
  @IsUUID('4', { each: true })
  ids: string[];
}
