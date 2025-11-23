import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../database/entities/payment.entity';
import { Audit } from '../database/entities/audit.entity';
import { Category } from '../database/entities/category.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    @InjectRepository(Audit)
    private auditRepository: Repository<Audit>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: ['category'],
      order: { paymentId: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { paymentId: id },
      relations: ['category'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    // Verify category exists
    const category = await this.categoryRepository.findOne({
      where: { categoryId: createPaymentDto.categoryId },
    });

    if (!category) {
      throw new BadRequestException(
        `Category with ID ${createPaymentDto.categoryId} not found`,
      );
    }

    // Check if reference number already exists
    const existingPayment = await this.paymentRepository.findOne({
      where: { referenceNo: createPaymentDto.referenceNo },
    });

    if (existingPayment) {
      throw new BadRequestException(
        `Payment with reference number ${createPaymentDto.referenceNo} already exists`,
      );
    }

    // Create payment
    const payment = this.paymentRepository.create(createPaymentDto);
    const savedPayment = await this.paymentRepository.save(payment);

    // Create audit log
    await this.createAuditLog(
      savedPayment.referenceNo,
      'Created',
      savedPayment.status,
      'System',
    );

    return await this.findOne(savedPayment.paymentId);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    // If updating category, verify it exists
    if (updatePaymentDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { categoryId: updatePaymentDto.categoryId },
      });

      if (!category) {
        throw new BadRequestException(
          `Category with ID ${updatePaymentDto.categoryId} not found`,
        );
      }
    }

    // If updating reference number, check for duplicates
    if (updatePaymentDto.referenceNo && updatePaymentDto.referenceNo !== payment.referenceNo) {
      const existingPayment = await this.paymentRepository.findOne({
        where: { referenceNo: updatePaymentDto.referenceNo },
      });

      if (existingPayment) {
        throw new BadRequestException(
          `Payment with reference number ${updatePaymentDto.referenceNo} already exists`,
        );
      }
    }

    // Update payment
    Object.assign(payment, updatePaymentDto);
    const updatedPayment = await this.paymentRepository.save(payment);

    // Create audit log
    await this.createAuditLog(
      updatedPayment.referenceNo,
      'Updated',
      updatedPayment.status,
      'System',
    );

    return await this.findOne(updatedPayment.paymentId);
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);

    // Create audit log before deletion
    await this.createAuditLog(payment.referenceNo, 'Deleted', payment.status, 'System');

    await this.paymentRepository.remove(payment);
  }

  async findByStatus(status: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { status },
      relations: ['category'],
      order: { paymentId: 'DESC' },
    });
  }

  async findByCategory(categoryId: number): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { categoryId },
      relations: ['category'],
      order: { paymentId: 'DESC' },
    });
  }

  private async createAuditLog(
    paymentRef: string,
    action: string,
    status: string,
    user: string,
  ): Promise<void> {
    const audit = this.auditRepository.create({
      paymentRef,
      action,
      date: new Date(),
      user,
      status,
    });

    await this.auditRepository.save(audit);
  }
}
