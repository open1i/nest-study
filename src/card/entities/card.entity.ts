import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '卡片ID' })
  id: number;

  @Column()
  @ApiProperty({ description: '卡片标题' })
  title: string;

  @Column()
  @ApiProperty({ description: '图片URL地址' })
  imageUrl: string;

  @Column({ default: 0 })
  @ApiProperty({ description: '卡片排序位置' })
  position: number;

  @Column({ default: true })
  @ApiProperty({ description: '是否启用' })
  isActive: boolean;

  @CreateDateColumn()
  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
