import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateStaffProfileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(120)
  lastName: string;
}
