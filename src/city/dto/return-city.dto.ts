import { ReturnStateDto } from 'src/state/dto/return-state.dto';
import { CityEntity } from '../entities/city.entity';

export class returnCityDto {
  name: string;
  state?: ReturnStateDto;

  constructor(city: CityEntity) {
    this.name = city.name;
    this.state = city.state ? new ReturnStateDto(city.state) : undefined;
  }
}
