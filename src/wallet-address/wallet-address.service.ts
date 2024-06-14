import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './wallet-address.entity';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class WalletAddressService {
  constructor(
    @InjectRepository(WalletAddress)
    private walletAddressRepository: Repository<WalletAddress>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<WalletAddress[]> {
    return this.walletAddressRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<WalletAddress> {
    return this.walletAddressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(
    createWalletDto: CreateWalletAddressDto,
  ): Promise<WalletAddress> {
    const user = await this.usersService.findOne(createWalletDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createWalletDto.userId} not found`,
      );
    }
    const wallet = this.walletAddressRepository.create(createWalletDto);
    wallet.user = user;
    return this.walletAddressRepository.save(wallet);
  }

  async update(
    id: number,
    createWalletDto: CreateWalletAddressDto,
  ): Promise<WalletAddress> {
    const wallet = await this.walletAddressRepository.findOne({
      where: { id },
    });
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`);
    }

    Object.assign(wallet, createWalletDto);
    await this.walletAddressRepository.save(wallet);

    return this.walletAddressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.walletAddressRepository.delete(id);
  }
}
