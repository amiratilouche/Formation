import { IsNotEmpty, Length, IsString, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'User should have a name' })
  @IsString()
  @Length(5, 50)
  name?: string;
  @IsNotEmpty({ message: 'User should have an email' })
  @Length(3, 255)
  email?: string;
  @IsNotEmpty({ message: 'User should have a password' })
  @Length(3, 255)
  password?: string;
}