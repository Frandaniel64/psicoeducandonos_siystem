import { IsEmail, MaxLength } from 'class-validator';

export class SubscribeNewsletterDto {
  @IsEmail({}, { message: 'El correo debe ser válido' })
  @MaxLength(254, { message: 'El correo excede la longitud máxima permitida' })
  email: string;
}
