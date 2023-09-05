import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @CreateDateColumn({ name: 'created_at', type: 'bigint' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'bigint' })
  updatedAt: number;
}
