import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  const mockPayment = {
    paymentId: 1,
    amount: 5000,
    categoryId: 1,
    date: new Date('2025-11-23'),
    status: 'Pending',
    referenceNo: 'PAY-001',
    category: {
      categoryId: 1,
      categoryName: 'Hospital Bills',
      type: 'Outgoing',
    },
  };

  const mockPaymentsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByStatus: jest.fn(),
    findByCategory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all payments', async () => {
      const payments = [mockPayment];
      mockPaymentsService.findAll.mockResolvedValue(payments);

      const result = await controller.findAll();

      expect(result).toEqual(payments);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should filter by status when status param provided', async () => {
      const payments = [mockPayment];
      mockPaymentsService.findByStatus.mockResolvedValue(payments);

      const result = await controller.findAll('Pending');

      expect(result).toEqual(payments);
      expect(service.findByStatus).toHaveBeenCalledWith('Pending');
    });

    it('should filter by category when categoryId param provided', async () => {
      const payments = [mockPayment];
      mockPaymentsService.findByCategory.mockResolvedValue(payments);

      const result = await controller.findAll(undefined, '1');

      expect(result).toEqual(payments);
      expect(service.findByCategory).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('should return a single payment', async () => {
      mockPaymentsService.findOne.mockResolvedValue(mockPayment);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockPayment);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new payment', async () => {
      const createPaymentDto: CreatePaymentDto = {
        amount: 5000,
        categoryId: 1,
        date: '2025-11-23',
        status: 'Pending',
        referenceNo: 'PAY-001',
      };

      mockPaymentsService.create.mockResolvedValue(mockPayment);

      const result = await controller.create(createPaymentDto);

      expect(result).toEqual(mockPayment);
      expect(service.create).toHaveBeenCalledWith(createPaymentDto);
    });
  });

  describe('update', () => {
    it('should update a payment', async () => {
      const updatePaymentDto: UpdatePaymentDto = {
        status: 'Completed',
      };

      const updatedPayment = { ...mockPayment, status: 'Completed' };
      mockPaymentsService.update.mockResolvedValue(updatedPayment);

      const result = await controller.update(1, updatePaymentDto);

      expect(result).toEqual(updatedPayment);
      expect(service.update).toHaveBeenCalledWith(1, updatePaymentDto);
    });
  });

  describe('remove', () => {
    it('should delete a payment', async () => {
      mockPaymentsService.remove.mockResolvedValue(undefined);

      await controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
