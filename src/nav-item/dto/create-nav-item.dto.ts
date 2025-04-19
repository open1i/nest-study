import { ApiProperty } from '@nestjs/swagger';

export class CreateNavItemDto {
  @ApiProperty({ description: '导航项显示名称', example: '首页' })
  displayName: string;

  @ApiProperty({ description: '导航路径', example: '/home' })
  path: string;

  @ApiProperty({ description: '排序序号', example: 1 })
  sortOrder: number;

  @ApiProperty({ description: '是否启用', example: true })
  isEnabled: boolean;
}
