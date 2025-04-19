import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUrl,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @ApiProperty({ description: '卡片标题', required: false })
  @IsOptional()
  @IsString({ message: '标题必须是字符串' })
  title?: string;

  @ApiProperty({ description: '图片URL地址', required: false })
  @IsOptional()
  @IsUrl({}, { message: '请提供有效的URL地址' })
  imageUrl?: string;

  @ApiProperty({ description: '卡片排序位置', required: false })
  @IsOptional()
  @IsNumber({}, { message: '排序位置必须是数字' })
  position?: number;

  @ApiProperty({ description: '是否启用', required: false })
  @IsOptional()
  @IsBoolean({ message: '启用状态必须是布尔值' })
  isActive?: boolean;
}
