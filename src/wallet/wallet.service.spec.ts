import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(() => {
    service = new WalletService();
  });

  it('should top up balance', () => {
    const wallet = service.topUp('user-1', 100);
    expect(wallet.balance).toBe(100);
  });

  it('should deduct balance', () => {
    service.topUp('user-1', 200);
    const wallet = service.deduct('user-1', 50);
    expect(wallet.balance).toBe(150);
  });

  it('should throw on insufficient funds', () => {
    service.topUp('user-1', 30);
    expect(() => service.deduct('user-1', 50)).toThrow('Insufficient balance');
  });
});