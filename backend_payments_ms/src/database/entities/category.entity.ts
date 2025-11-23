import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from './payment.entity';

@Entity('CATEGORIES')
export class Category {
  @PrimaryGeneratedColumn({ name: 'CATEGORY_ID' })
  categoryId: number;

  @Column({
    name: 'CATEGORY_NAME',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  categoryName: string;

  @Column({
    name: 'TYPE',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  type: string; // 'Incoming' | 'Outgoing'

  @Column({
    name: 'DESCRIPTION',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'STATUS',
    type: 'varchar',
    length: 20,
    nullable: false,
    default: 'Active',
  })
  status: string; // 'Active' | 'Inactive'

  @Column({
    name: 'MANAGER',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  manager: string;

  @OneToMany(() => Payment, (payment) => payment.category)
  payments: Payment[];

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
