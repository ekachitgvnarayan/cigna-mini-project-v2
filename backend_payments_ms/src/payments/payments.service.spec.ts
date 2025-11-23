import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentsService } from './payments.service';
import { Payment } from '../database/entities/payment.entity';
import { Audit } from '../database/entities/audit.entity';
import { Category } from '../database/entities/category.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let paymentRepository: Repository<Payment>;
  let auditRepository: Repository<Audit>;
  let categoryRepository: Repository<Category>;

  // Mock data
  const mockCategory = {
    categoryId: 1,
    categoryName: 'Hospital Bills',
    type: 'Outgoing',
    description: 'Medical expenses',
    status: 'Active',
    manager: 'Finance Team',
  };

  const mockPayment = {
    paymentId: 1,
    amount: 5000,
    categoryId: 1,
    date: new Date('2025-11-23'),
    status: 'Pending',
    referenceNo: 'PAY-001',
    category: mockCategory,
  };

  const mockAudit = {
    auditId: 1,
    paymentRef: 'PAY-001',
    action: 'Created',
    date: new Date(),
    user: 'System',
    status: 'Pending',
  };

  // Mock repositories
  const mockPaymentRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockAuditRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockCategoryRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        {
          provide: getRepositoryToken(Payment),
          useValue: mockPaymentRepository,
        },
        {
          provide: getRepositoryToken(Audit),
          useValue: mockAuditRepository,
        },
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    paymentRepository = module.get<Repository<Payment>>(getRepositoryToken(Payment));
    auditRepository = module.get<Repository<Audit>>(getRepositoryToken(Audit));
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of payments', async () => {
      const payments = [mockPayment];
      mockPaymentRepository.find.mockResolvedValue(payments);

      const result = await service.findAll();

      expect(result).toEqual(payments);
      expect(mockPaymentRepository.find).toHaveBeenCalledWith({
        relations: ['category'],
        order: { paymentId: 'DESC' },
      });
    });

    it('should return empty array when no payments exist', async () => {
      mockPaymentRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a payment by id', async () => {
      mockPaymentRepository.findOne.mockResolvedValue(mockPayment);

      const result = await service.findOne(1);

      expect(result).toEqual(mockPayment);
      expect(mockPaymentRepository.findOne).toHaveBeenCalledWith({
        where: { paymentId: 1 },
        relations: ['category'],
      });
    });

    it('should throw NotFoundException when payment not found', async () => {
      mockPaymentRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow('Payment with ID 999 not found');
    });
  });

  describe('create', () => {
    const createPaymentDto = {
      amount: 5000,
      categoryId: 1,
      date: '2025-11-23',
      status: 'Pending',
      referenceNo: 'PAY-001',
    };

    it('should create a new payment successfully', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
      //mockPaymentRepository.findOne.mockResolvedValue(null); // No existing payment
      mockPaymentRepository.findOne
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockPayment);
      mockPaymentRepository.create.mockReturnValue(mockPayment);
      mockPaymentRepository.save.mockResolvedValue(mockPayment);
      //mockPaymentRepository.findOne.mockResolvedValue(mockPayment); // For final findOne
      mockAuditRepository.create.mockReturnValue(mockAudit);
      mockAuditRepository.save.mockResolvedValue(mockAudit);

      const result = await service.create(createPaymentDto);

      expect(result).toEqual(mockPayment);
      // expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
      //   where: { categoryId: 1 },
      // });
      expect(mockPaymentRepository.create).toHaveBeenCalledWith(createPaymentDto);
      expect(mockPaymentRepository.save).toHaveBeenCalled();
      expect(mockAuditRepository.create).toHaveBeenCalled();
      expect(mockAuditRepository.save).toHaveBeenCalled();
    });

    it('should throw BadRequestException when category not found', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createPaymentDto)).rejects.toThrow(BadRequestException);
      await expect(service.create(createPaymentDto)).rejects.toThrow(
        'Category with ID 1 not found',
      );
    });

    it('should throw BadRequestException when reference number already exists', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
      mockPaymentRepository.findOne.mockResolvedValue(mockPayment); // Existing payment

      await expect(service.create(createPaymentDto)).rejects.toThrow(BadRequestException);
      await expect(service.create(createPaymentDto)).rejects.toThrow(
        'Payment with reference number PAY-001 already exists',
      );
    });
  });

  describe('update', () => {
    const updatePaymentDto = {
      status: 'Completed',
      amount: 6000,
    };

    it('should update a payment successfully', async () => {
      const updatedPayment = { ...mockPayment, ...updatePaymentDto };
      
      mockPaymentRepository.findOne
        .mockResolvedValueOnce(mockPayment) // For findOne in update
        .mockResolvedValueOnce(updatedPayment); // For final findOne
      
      mockPaymentRepository.save.mockResolvedValue(updatedPayment);
      mockAuditRepository.create.mockReturnValue(mockAudit);
      mockAuditRepository.save.mockResolvedValue(mockAudit);

      const result = await service.update(1, updatePaymentDto);

      expect(result.status).toEqual('Completed');
      expect(result.amount).toEqual(6000);
      expect(mockPaymentRepository.save).toHaveBeenCalled();
      expect(mockAuditRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when payment not found', async () => {
      mockPaymentRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, updatePaymentDto)).rejects.toThrow(NotFoundException);
    });

    it('should validate category when updating categoryId', async () => {
      const updateWithCategory = { categoryId: 2 };
      mockPaymentRepository.findOne.mockResolvedValue(mockPayment);
      mockCategoryRepository.findOne.mockResolvedValue(null);

      await expect(service.update(1, updateWithCategory)).rejects.toThrow(BadRequestException);
      await expect(service.update(1, updateWithCategory)).rejects.toThrow(
        'Category with ID 2 not found',
      );
    });
  });

  describe('remove', () => {
    it('should delete a payment successfully', async () => {
      mockPaymentRepository.findOne.mockResolvedValue(mockPayment);
      mockPaymentRepository.remove.mockResolvedValue(mockPayment);
      mockAuditRepository.create.mockReturnValue(mockAudit);
      mockAuditRepository.save.mockResolvedValue(mockAudit);

      await service.remove(1);

      expect(mockPaymentRepository.remove).toHaveBeenCalledWith(mockPayment);
      expect(mockAuditRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when payment not found', async () => {
      mockPaymentRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByStatus', () => {
    it('should return payments filtered by status', async () => {
      const payments = [mockPayment];
      mockPaymentRepository.find.mockResolvedValue(payments);

      const result = await service.findByStatus('Pending');

      expect(result).toEqual(payments);
      expect(mockPaymentRepository.find).toHaveBeenCalledWith({
        where: { status: 'Pending' },
        relations: ['category'],
        order: { paymentId: 'DESC' },
      });
    });
  });

  describe('findByCategory', () => {
    it('should return payments filtered by category', async () => {
      const payments = [mockPayment];
      mockPaymentRepository.find.mockResolvedValue(payments);

      const result = await service.findByCategory(1);

      expect(result).toEqual(payments);
      expect(mockPaymentRepository.find).toHaveBeenCalledWith({
        where: { categoryId: 1 },
        relations: ['category'],
        order: { paymentId: 'DESC' },
      });
    });
  });
});
