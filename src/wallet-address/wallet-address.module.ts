import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletAddress } from './wallet-address.entity';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddressController } from './wallet-address.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([WalletAddress]), UsersModule],
  controllers: [WalletAddressController],
  providers: [WalletAddressService],
})
export class WalletAddressModule {}
