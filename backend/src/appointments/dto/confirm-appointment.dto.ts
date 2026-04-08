import { MaxLength, MinLength } from 'class-validator';
import { IsHttpUrl } from '../../common/validators/is-http-url.validator';

export class ConfirmAppointmentDto {
  @MinLength(8)
  @MaxLength(2048)
  @IsHttpUrl()
  meetingLink: string;
}
