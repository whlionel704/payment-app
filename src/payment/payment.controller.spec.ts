import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dtos/create-payment.dto';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  const mockPaymentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new payment', () => {
    const dto: CreatePaymentDto = {
        userId: 'user-123', amount: 50,
        currency: '',
        description: ''
    };
    const payment: Payment = {
        id: 'abc123',
        userId: dto.userId,
        amount: dto.amount,
        timestamp: new Date(),
        currency: '',
        description: ''
    };

    mockPaymentService.create.mockReturnValue(payment);

    const result = controller.create(dto);
    expect(result).toEqual(payment);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all payments', () => {
    const payments = [
      { id: '1', userId: 'u1', amount: 100, status: 'completed', timestamp: new Date() },
      { id: '2', userId: 'u2', amount: 200, status: 'completed', timestamp: new Date() },
    ];

    mockPaymentService.findAll.mockReturnValue(payments);

    const result = controller.findAll();
    expect(result).toEqual(payments);
  });

  it('should return a payment by ID', () => {
    const payment = {
      id: 'p1',
      userId: 'u1',
      amount: 75,
      status: 'completed',
      timestamp: new Date(),
    };

    mockPaymentService.findOne.mockReturnValue(payment);

    const result = controller.findOne('p1');
    expect(result).toEqual(payment);
  });
});