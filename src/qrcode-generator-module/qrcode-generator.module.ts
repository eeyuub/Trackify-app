import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrcodeGeneratorService } from './services/qrcode-generator.service';

@Module({
  imports: [],
  controllers: [],
  providers: [QrcodeGeneratorService],
  exports: [QrcodeGeneratorService]
})
export class QrcodeGeneratorModule {}

