import { PaymentService } from './payment.service';
import { WalletService } from '../wallet/wallet.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';


describe('PaymentService', () => {
  let service: PaymentService;
  let walletService: WalletService;

  const mockWalletService = {
    deduct: jest.fn(),
  };

  beforeEach(() => {
    service = new PaymentService(mockWalletService as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a payment and deduct wallet balance', () => {
    const dto: CreatePaymentDto = {
      userId: 'user-123',
      amount: 100,
      currency: '',
      description: ''
    };

    const payment = service.create(dto);

    expect(payment).toHaveProperty('id');
    expect(payment.userId).toBe(dto.userId);
    expect(payment.amount).toBe(dto.amount);
    expect(mockWalletService.deduct).toHaveBeenCalledWith('user-123', 100);
  });

  it('should throw error if wallet deduction fails', () => {
    mockWalletService.deduct.mockImplementation(() => {
      throw new Error('Insufficient balance');
    });

    const dto: CreatePaymentDto = {
      userId: 'user-123',
      amount: 100,
      currency: '',
      description: ''
    };

    expect(() => service.create(dto)).toThrow('Payment failed: Insufficient balance');
  });

  it('should throw if payment not found', () => {
    expect(() => service.findOne('non-existent')).toThrow('Payment not found');
  });
});