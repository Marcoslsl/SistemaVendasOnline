import { CreateStateDto } from '../dto/create-state.dto';
import { StateEntity } from '../entities/state.entity';

export const stateEntityMock: StateEntity = {
  id: 1,
  name: 'Pernambuco',
  createdAt: 12,
  updatedAt: 12,
  cities: [],
};
