import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('图片卡片管理')
@Controller('card')
@ApiBearerAuth()
export class CardController {
  constructor(
    private readonly fileUploadService: FileUploadService,
    private readonly cardService: CardService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '图片上传' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '图片文件上传',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '文件上传成功',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: 'https://example.com/uploads/image.jpg',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      url: await this.fileUploadService.uploadFile(file),
    };
  }

  @ApiOperation({ summary: '创建图片卡片' })
  @ApiResponse({ status: 201, description: '卡片创建成功', type: Card })
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @ApiOperation({ summary: '获取所有卡片' })
  @ApiResponse({ status: 200, description: '成功获取卡片列表', type: [Card] })
  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @ApiOperation({ summary: '获取指定卡片' })
  @ApiResponse({ status: 200, description: '成功获取卡片详情', type: Card })
  @ApiResponse({ status: 404, description: '卡片不存在' })
  @ApiParam({ name: 'id', description: '卡片ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @ApiOperation({ summary: '更新卡片信息' })
  @ApiResponse({ status: 200, description: '卡片更新成功', type: Card })
  @ApiResponse({ status: 404, description: '卡片不存在' })
  @ApiParam({ name: 'id', description: '卡片ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @ApiOperation({ summary: '删除卡片' })
  @ApiResponse({ status: 200, description: '卡片删除成功' })
  @ApiResponse({ status: 404, description: '卡片不存在' })
  @ApiParam({ name: 'id', description: '卡片ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
