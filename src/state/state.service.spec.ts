import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';
import { stateEntityMock } from './mock/state.mock';

describe('User2Service', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(stateEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });
  it('should return a list of states', async () => {
    const state = await service.findAll();
    expect(state).toEqual(stateEntityMock);
  });
  it('should return an error', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());
    expect(service.findAll()).rejects.toThrowError();
  });
});
