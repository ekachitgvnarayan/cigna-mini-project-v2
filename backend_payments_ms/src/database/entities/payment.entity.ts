import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('PAYMENTS')
export class Payment {
    
  @PrimaryGeneratedColumn({ name: 'PAYMENT_ID' })
  paymentId: number;

  @Column({
    name: 'AMOUNT',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  @Column({ name: 'CATEGORY_ID', nullable: false })
  categoryId: number;

  @Column({ name: 'DATE', type: 'date', nullable: false })
  date: Date;

  @Column({
    name: 'STATUS',
    type: 'varchar',
    length: 20,
    nullable: false,
    default: 'Pending',
  })
  status: string; // 'Pending' | 'Completed'

  @Column({
    name: 'REFERENCE_NO',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  referenceNo: string;

  @ManyToOne(() => Category, (category) => category.payments, { eager: true })
  @JoinColumn({ name: 'CATEGORY_ID' })
  category: Category;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
