import { IsEmail, IsNotEmpty, IsDate, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string


  @IsDateString()
  birthDate: Date;
}
