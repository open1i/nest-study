import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// 导入创建导航项的DTO类型
interface CreateNavItemDto {
  name: string;
  path: string;
  icon?: string;
  order?: number;
}

@ApiTags('导航项管理')
@Controller('nav-item')
export class NavItemController {
  @ApiOperation({ summary: '创建导航项' })
  @ApiResponse({ status: 201, description: '成功创建导航项' })
  @Post()
  create(@Body() createNavItemDto: CreateNavItemDto) {
    return 'This action adds a new nav-item';
  }

  @ApiOperation({ summary: '获取所有导航项' })
  @ApiResponse({ status: 200, description: '成功获取导航列表' })
  @Get()
  findAll() {
    return 'This action returns all nav-items';
  }
}
