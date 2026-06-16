import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateGymDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  location!: string;

  @IsNumber()
  @Min(1)
  capacity!: number;
}