import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { HealthModule } from './health/health.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [PaymentModule, WalletModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
