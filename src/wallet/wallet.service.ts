import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  private wallets: Wallet[] = [];

  getBalance(userId: string): Wallet {
    const wallet = this.wallets.find(w => w.userId === userId);
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  topUp(userId: string, amount: number): Wallet {
    let wallet = this.wallets.find(w => w.userId === userId);
    if (!wallet) {
      wallet = { userId, balance: amount, updatedAt: new Date() };
      this.wallets.push(wallet);
    } else {
      wallet.balance += amount;
      wallet.updatedAt = new Date();
    }
    return wallet;
  }

  deduct(userId: string, amount: number): Wallet {
    const wallet = this.getBalance(userId);
    if (wallet.balance < amount) throw new Error('Insufficient balance');
    wallet.balance -= amount;
    wallet.updatedAt = new Date();
    return wallet;
  }
}