import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':userId')
  getBalance(@Param('userId') userId: string) {
    return this.walletService.getBalance(userId);
  }

  @Post('topup/:userId')
  topUp(@Param('userId') userId: string, @Body('amount') amount: number) {
    return this.walletService.topUp(userId, amount);
  }
}