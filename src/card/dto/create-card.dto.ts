import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ description: '卡片标题' })
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须是字符串' })
  title: string;

  @ApiProperty({ description: '图片URL地址' })
  @IsNotEmpty({ message: '图片URL不能为空' })
  @IsUrl({}, { message: '请提供有效的URL地址' })
  imageUrl: string;

  @ApiProperty({ description: '卡片排序位置', required: false, default: 0 })
  @IsOptional()
  @IsNumber({}, { message: '排序位置必须是数字' })
  position?: number;

  @ApiProperty({ description: '是否启用', required: false, default: true })
  @IsOptional()
  @IsBoolean({ message: '启用状态必须是布尔值' })
  isActive?: boolean;
}
