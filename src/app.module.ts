import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WalletAddressModule } from './wallet-address/wallet-address.module';
import { User } from './users/users.entity';
import { WalletAddress } from './wallet-address/wallet-address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_db_user',
      password: 'your_db_password',
      database: 'crud_nest',
      entities: [User, WalletAddress],
      synchronize: true,
    }),
    UsersModule,
    WalletAddressModule,
  ],
})
export class AppModule {}
