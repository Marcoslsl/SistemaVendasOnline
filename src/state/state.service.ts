import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async create(createStateDto: CreateStateDto): Promise<StateEntity> {
    const stateCreated = await this.stateRepository.create(createStateDto);
    await this.stateRepository.save(stateCreated);
    return stateCreated;
  }

  async findAll(): Promise<StateEntity[]> {
    return this.stateRepository.find();
  }

  async findOne(id: number): Promise<StateEntity | null> {
    return this.stateRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    updateStateDto: UpdateStateDto,
  ): Promise<StateEntity> {
    await this.stateRepository.update(id, updateStateDto);
    return await this.stateRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.stateRepository.delete({ id });
  }
}
