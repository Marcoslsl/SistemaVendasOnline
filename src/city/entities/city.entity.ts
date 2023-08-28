import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'city' })
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'state_id', nullable: false })
  stateId: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'bigint' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'bigint' })
  updatedAt: number;
}
