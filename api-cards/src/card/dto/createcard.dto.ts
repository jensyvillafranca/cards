import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  descriptions: string[]; 
}