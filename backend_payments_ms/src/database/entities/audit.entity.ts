import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('AUDIT')
export class Audit {
  @PrimaryGeneratedColumn({ name: 'AUDIT_ID' })
  auditId: number;

  @Column({
    name: 'PAYMENT_REF',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  paymentRef: string;

  @Column({
    name: 'ACTION',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  action: string; // 'Created' | 'Updated' | 'Deleted'

  @Column({ name: 'DATE', type: 'timestamp', nullable: false })
  date: Date;

  @Column({
    name: 'USER',
    type: 'varchar',
    length: 100,
    nullable: false,
    default: 'System',
  })
  user: string;

  @Column({
    name: 'STATUS',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  status: string;

  @CreateDateColumn({ name: 'CREATED_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
