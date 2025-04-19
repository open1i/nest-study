import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavItem } from './entities/nav-item.entity';
import { CreateNavItemDto } from './dto/create-nav-item.dto';
import { UpdateNavItemDto } from './dto/update-nav-item.dto';

@Injectable()
export class NavItemService {
  constructor(
    @InjectRepository(NavItem)
    private readonly navItemRepository: Repository<NavItem>,
  ) {}

  async create(createNavItemDto: CreateNavItemDto): Promise<NavItem> {
    const navItem = this.navItemRepository.create({
      name: createNavItemDto.displayName,
      url: createNavItemDto.path,
      isActive: createNavItemDto.isEnabled,
    });
    return await this.navItemRepository.save(navItem);
  }

  async findAll(): Promise<NavItem[]> {
    return await this.navItemRepository.find();
  }

  async findOne(id: number): Promise<NavItem> {
    const navItem = await this.navItemRepository.findOneBy({ id });
    if (!navItem) {
      throw new NotFoundException(`NavItem with ID ${id} not found`);
    }
    return navItem;
  }

  async update(
    id: number,
    updateNavItemDto: UpdateNavItemDto,
  ): Promise<NavItem> {
    await this.navItemRepository.update(id, {
      name: updateNavItemDto.displayName,
      url: updateNavItemDto.path,
      isActive: updateNavItemDto.isEnabled,
    });
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.navItemRepository.delete(id);
  }
}
