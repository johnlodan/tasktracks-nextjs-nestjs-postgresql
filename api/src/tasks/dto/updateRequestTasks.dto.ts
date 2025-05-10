import { IsUUID, IsArray } from 'class-validator';

export class UpdateRequestTasks {
  stageId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  taskIds: string[];
}
