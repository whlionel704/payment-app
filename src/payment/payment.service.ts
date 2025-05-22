import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { Payment } from './payment.entity';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly walletService: WalletService,
  ) {}

  private payments: Payment[] = [];

  create(createPaymentDto: CreatePaymentDto): Payment {
    const { userId, amount } = createPaymentDto;

    try {
        this.walletService.deduct(userId, amount); // 🔁 Deduct from wallet
    } catch (err) {
        throw new Error('Payment failed: ' + err.message);
    }    
    
    const newPayment: Payment = {
        id: uuidv4(),
        ...createPaymentDto,
        timestamp: new Date(),
    };
    this.payments.push(newPayment);
    return newPayment;
  }

  findAll(): Payment[] {
    return this.payments;
  }

  findOne(id: string): Payment {
    const payment = this.payments.find(p => p.id === id);
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  remove(id: string): void {
    const index = this.payments.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('Payment not found');
    this.payments.splice(index, 1);
  }
}