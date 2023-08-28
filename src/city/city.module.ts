import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60 * 30, // seconds
      max: 10, // maximum number of items in cache
    }),
    TypeOrmModule.forFeature([CityEntity]),
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
