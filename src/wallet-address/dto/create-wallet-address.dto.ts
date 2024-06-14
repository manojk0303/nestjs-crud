import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateWalletAddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
