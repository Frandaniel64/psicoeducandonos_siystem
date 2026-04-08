import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterPatientDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  lastName: string;

  @IsEmail({}, { message: 'El correo debe ser válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/[0-9]/, {
    message: 'La contraseña debe incluir al menos un número',
  })
  @Matches(/[A-Za-z]/, {
    message: 'La contraseña debe incluir al menos una letra',
  })
  password: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
