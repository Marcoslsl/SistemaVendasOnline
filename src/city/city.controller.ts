import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }

  @Get('/state/:stateId')
  async getAllCitiesByStateId(@Param('stateId') stateId: number) {
    return await this.cityService.getAllCitiesByStateId(+stateId);
  }
  // @Post()
  // create(@Body() createCityDto: CreateCityDto) {
  //   return this.cityService.create(createCityDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.cityService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
  //   return this.cityService.update(+id, updateCityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cityService.remove(+id);
  // }
}
