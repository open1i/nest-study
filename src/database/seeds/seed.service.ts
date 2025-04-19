import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../../card/entities/card.entity';
import { NavItem } from '../../nav-item/entities/nav-item.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(NavItem)
    private readonly navItemRepository: Repository<NavItem>,
  ) {}

  /**
   * 初始化数据库种子数据
   */
  async seed() {
    await this.seedCards();
    await this.seedNavItems();
  }

  /**
   * 检查数据库是否为空
   */
  async isDatabaseEmpty(): Promise<boolean> {
    const cardCount = await this.cardRepository.count();
    const navItemCount = await this.navItemRepository.count();
    return cardCount === 0 && navItemCount === 0;
  }

  /**
   * 初始化卡片数据
   */
  private async seedCards() {
    const cards = [
      {
        title: '前端开发',
        imageUrl: 'https://example.com/frontend.jpg',
        position: 1,
        isActive: true,
      },
      {
        title: '后端开发',
        imageUrl: 'https://example.com/backend.jpg',
        position: 2,
        isActive: true,
      },
      {
        title: '移动开发',
        imageUrl: 'https://example.com/mobile.jpg',
        position: 3,
        isActive: true,
      },
    ];

    for (const cardData of cards) {
      const card = this.cardRepository.create(cardData);
      await this.cardRepository.save(card);
    }

    console.log('卡片数据初始化完成');
  }

  /**
   * 初始化导航项数据
   */
  private async seedNavItems() {
    const navItems = [
      {
        name: '首页',
        url: '/',
        isActive: true,
      },
      {
        name: '课程',
        url: '/courses',
        isActive: true,
      },
      {
        name: '关于我们',
        url: '/about',
        isActive: true,
      },
    ];

    for (const navItemData of navItems) {
      const navItem = this.navItemRepository.create(navItemData);
      await this.navItemRepository.save(navItem);
    }

    console.log('导航项数据初始化完成');
  }
}
