import { Test, TestingModule } from '@nestjs/testing';
import { AuditsController } from './audits.controller';
import { AuditsService } from './audits.service';

describe('AuditsController', () => {
  let controller: AuditsController;
  let service: AuditsService;

  const mockAudit = {
    auditId: 1,
    paymentRef: 'PAY-001',
    action: 'Created',
    date: new Date('2025-11-23T10:00:00Z'),
    user: 'System',
    status: 'Pending',
  };

  const mockAuditsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByPaymentRef: jest.fn(),
    findByAction: jest.fn(),
    findByDateRange: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditsController],
      providers: [
        {
          provide: AuditsService,
          useValue: mockAuditsService,
        },
      ],
    }).compile();

    controller = module.get<AuditsController>(AuditsController);
    service = module.get<AuditsService>(AuditsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all audit records', async () => {
      const audits = [mockAudit];
      mockAuditsService.findAll.mockResolvedValue(audits);

      const result = await controller.findAll();

      expect(result).toEqual(audits);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should return empty array when no audits exist', async () => {
      mockAuditsService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should filter by payment reference when paymentRef param provided', async () => {
      const audits = [mockAudit];
      mockAuditsService.findByPaymentRef.mockResolvedValue(audits);

      const result = await controller.findAll('PAY-001');

      expect(result).toEqual(audits);
      expect(service.findByPaymentRef).toHaveBeenCalledWith('PAY-001');
      expect(service.findAll).not.toHaveBeenCalled();
    });

    it('should filter by action when action param provided', async () => {
      const audits = [mockAudit];
      mockAuditsService.findByAction.mockResolvedValue(audits);

      const result = await controller.findAll(undefined, 'Created');

      expect(result).toEqual(audits);
      expect(service.findByAction).toHaveBeenCalledWith('Created');
      expect(service.findAll).not.toHaveBeenCalled();
    });

    it('should prioritize paymentRef filter over action filter when both provided', async () => {
      const audits = [mockAudit];
      mockAuditsService.findByPaymentRef.mockResolvedValue(audits);

      const result = await controller.findAll('PAY-001', 'Created');

      expect(result).toEqual(audits);
      expect(service.findByPaymentRef).toHaveBeenCalledWith('PAY-001');
      expect(service.findByAction).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single audit record', async () => {
      mockAuditsService.findOne.mockResolvedValue(mockAudit);

      const result = await controller.findOne(1);

      expect(result).toEqual(mockAudit);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should call service with correct id parameter', async () => {
      mockAuditsService.findOne.mockResolvedValue(mockAudit);

      await controller.findOne(999);

      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('filter scenarios', () => {
    it('should return audits for specific payment reference', async () => {
      const paymentAudits = [
        { ...mockAudit, action: 'Created' },
        { ...mockAudit, auditId: 2, action: 'Updated' },
        { ...mockAudit, auditId: 3, action: 'Deleted' },
      ];
      mockAuditsService.findByPaymentRef.mockResolvedValue(paymentAudits);

      const result = await controller.findAll('PAY-001');

      expect(result).toEqual(paymentAudits);
      expect(result).toHaveLength(3);
    });

    it('should return audits for specific action type', async () => {
      const createdAudits = [
        mockAudit,
        { ...mockAudit, auditId: 2, paymentRef: 'PAY-002' },
      ];
      mockAuditsService.findByAction.mockResolvedValue(createdAudits);

      const result = await controller.findAll(undefined, 'Created');

      expect(result).toEqual(createdAudits);
      expect(result).toHaveLength(2);
    });

    it('should handle "Updated" action filter', async () => {
      const updatedAudit = { ...mockAudit, action: 'Updated' };
      mockAuditsService.findByAction.mockResolvedValue([updatedAudit]);

      const result = await controller.findAll(undefined, 'Updated');

      expect(result).toEqual([updatedAudit]);
      expect(service.findByAction).toHaveBeenCalledWith('Updated');
    });

    it('should handle "Deleted" action filter', async () => {
      const deletedAudit = { ...mockAudit, action: 'Deleted' };
      mockAuditsService.findByAction.mockResolvedValue([deletedAudit]);

      const result = await controller.findAll(undefined, 'Deleted');

      expect(result).toEqual([deletedAudit]);
      expect(service.findByAction).toHaveBeenCalledWith('Deleted');
    });
  });
});
