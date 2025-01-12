import { Module } from '@nestjs/common';
import { LocalStorageService } from './services/local-upload.service';

@Module({
  imports: [],
  controllers: [],
  providers: [LocalStorageService],
  exports: [LocalStorageService]
})
export class UploadModule {}


