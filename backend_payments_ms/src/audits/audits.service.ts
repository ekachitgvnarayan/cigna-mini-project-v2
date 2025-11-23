import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from '../database/entities/audit.entity';

@Injectable()
export class AuditsService {
  constructor(
    @InjectRepository(Audit)
    private auditRepository: Repository<Audit>,
  ) {}

  async findAll(): Promise<Audit[]> {
    return await this.auditRepository.find({
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Audit> {
    const audit = await this.auditRepository.findOne({
      where: { auditId: id },
    });

    if (!audit) {
      throw new NotFoundException(`Audit record with ID ${id} not found`);
    }

    return audit;
  }

  async findByPaymentRef(paymentRef: string): Promise<Audit[]> {
    return await this.auditRepository.find({
      where: { paymentRef },
      order: { date: 'DESC' },
    });
  }

  async findByAction(action: string): Promise<Audit[]> {
    return await this.auditRepository.find({
      where: { action },
      order: { date: 'DESC' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Audit[]> {
    return await this.auditRepository
      .createQueryBuilder('audit')
      .where('audit.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('audit.date', 'DESC')
      .getMany();
  }
}
