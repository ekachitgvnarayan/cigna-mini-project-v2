import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategory = {
    categoryId: 1,
    categoryName: 'Hospital Bills',
    type: 'Outgoing',
    description: 'Medical expenses',
    status: 'Active',
    manager: 'Finance Team',
  };

  const mockCategoriesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByType: jest.fn(),
    findByStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const categories = [mockCategory];
      mockCategoriesService.findAll.mockResolvedValue(categories);

      const result = await controller.findAll();

      expect(result).toEqual(categories);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should filter by type when type param provided', async () => {
      const categories = [mockCategory];
      mockCategoriesService.findByType.mockResolvedValue(categories);

      const result = await controller.findAll('Outgoing');

      expect(result).toEqual(categories);
      expect(service.findByType).toHaveBeenCalledWith('Outgoing');
    });

    it('should filter by status when status param provided', async () => {
      const categories = [mockCategory];
      mockCategoriesService.findByStatus.mockResolvedValue(categories);

      const result = await controller.findAll(undefined, 'Active');

      expect(result).toEqual(categories);
      expect(service.findByStatus).toHaveBeenCalledWith('Active');
    });
  });
});
