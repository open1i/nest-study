import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class FileUploadService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.mimetype)) {
        throw new Error('不支持的文件格式');
      }

      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { data, error } = await this.supabase.storage
        .from('cards')
        .upload(`images/${fileName}`, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error('Supabase存储错误:', error);
        throw new Error(
          error.message.includes('size exceeds')
            ? '文件大小超过限制（最大5MB）'
            : `上传失败：${error.message}`,
        );
      }

      return this.supabase.storage
        .from('cards')
        .getPublicUrl(`images/${fileName}`).data.publicUrl;
    } catch (e) {
      console.error(`[${new Date().toISOString()}] 文件上传失败`, e);
      throw new Error(
        e instanceof Error ? e.message : '文件上传过程中发生未知错误',
      );
    }
  }
}
