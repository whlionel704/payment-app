import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

describe('WalletController', () => {
  let controller: WalletController;
  let service: WalletService;

  const mockWalletService = {
    getBalance: jest.fn(),
    topUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: mockWalletService,
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getBalance', () => {
    it('should return wallet balance for a given user', () => {
      const mockWallet: Wallet = {
        userId: 'user-123',
        balance: 150,
        updatedAt: new Date(),
      };

      mockWalletService.getBalance.mockReturnValue(mockWallet);

      const result = controller.getBalance('user-123');
      expect(result).toEqual(mockWallet);
      expect(service.getBalance).toHaveBeenCalledWith('user-123');
    });
  });

  describe('topUp', () => {
    it('should return updated wallet after top up', () => {
      const mockWallet: Wallet = {
        userId: 'user-123',
        balance: 200,
        updatedAt: new Date(),
      };

      mockWalletService.topUp.mockReturnValue(mockWallet);

      const result = controller.topUp('user-123', 50);
      expect(result).toEqual(mockWallet);
      expect(service.topUp).toHaveBeenCalledWith('user-123', 50);
    });
  });
});