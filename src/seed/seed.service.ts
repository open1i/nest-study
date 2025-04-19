import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async isDatabaseEmpty(): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const tables = await queryRunner.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    await queryRunner.release();
    return tables.length === 0;
  }

  async seed(): Promise<void> {
    // 这里添加初始化数据的逻辑
  }
}
