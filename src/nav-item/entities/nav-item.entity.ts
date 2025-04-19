import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NavItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: true })
  isActive: boolean;
}
