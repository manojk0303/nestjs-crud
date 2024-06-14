import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { CreateWalletAddressDto } from './dto/create-wallet-address.dto';

@Controller('wallets')
export class WalletAddressController {
  constructor(private readonly walletService: WalletAddressService) {}

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.walletService.findOne(id);
  }

  @Post()
  create(@Body() createWalletDto: CreateWalletAddressDto) {
    return this.walletService.create(createWalletDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() createWalletDto: CreateWalletAddressDto,
  ) {
    return this.walletService.update(id, createWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.walletService.remove(id);
  }
}
