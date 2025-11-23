import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditsService } from './audits.service';
import { Audit } from '../database/entities/audit.entity';
import { NotFoundException } from '@nestjs/common';

describe('AuditsService', () => {
  let service: AuditsService;
  let auditRepository: Repository<Audit>;

  const mockAudit = {
    auditId: 1,
    paymentRef: 'PAY-001',
    action: 'Created',
    date: new Date(),
    user: 'System',
    status: 'Pending',
  };

  const mockAuditRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditsService,
        {
          provide: getRepositoryToken(Audit),
          useValue: mockAuditRepository,
        },
      ],
    }).compile();

    service = module.get<AuditsService>(AuditsService);
    auditRepository = module.get<Repository<Audit>>(getRepositoryToken(Audit));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of audits', async () => {
      const audits = [mockAudit];
      mockAuditRepository.find.mockResolvedValue(audits);

      const result = await service.findAll();

      expect(result).toEqual(audits);
      expect(mockAuditRepository.find).toHaveBeenCalledWith({
        order: { date: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return an audit by id', async () => {
      mockAuditRepository.findOne.mockResolvedValue(mockAudit);

      const result = await service.findOne(1);

      expect(result).toEqual(mockAudit);
    });

    it('should throw NotFoundException when audit not found', async () => {
      mockAuditRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByPaymentRef', () => {
    it('should return audits filtered by payment reference', async () => {
      const audits = [mockAudit];
      mockAuditRepository.find.mockResolvedValue(audits);

      const result = await service.findByPaymentRef('PAY-001');

      expect(result).toEqual(audits);
      expect(mockAuditRepository.find).toHaveBeenCalledWith({
        where: { paymentRef: 'PAY-001' },
        order: { date: 'DESC' },
      });
    });
  });

  describe('findByAction', () => {
    it('should return audits filtered by action', async () => {
      const audits = [mockAudit];
      mockAuditRepository.find.mockResolvedValue(audits);

      const result = await service.findByAction('Created');

      expect(result).toEqual(audits);
      expect(mockAuditRepository.find).toHaveBeenCalledWith({
        where: { action: 'Created' },
        order: { date: 'DESC' },
      });
    });
  });
});
