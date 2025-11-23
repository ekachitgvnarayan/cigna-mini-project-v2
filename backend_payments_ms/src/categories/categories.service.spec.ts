import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from '../database/entities/category.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryRepository: Repository<Category>;

  const mockCategory = {
    categoryId: 1,
    categoryName: 'Hospital Bills',
    type: 'Outgoing',
    description: 'Medical expenses',
    status: 'Active',
    manager: 'Finance Team',
    payments: [],
  };

  const mockCategoryRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = [mockCategory];
      mockCategoryRepository.find.mockResolvedValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(categories);
      expect(mockCategoryRepository.find).toHaveBeenCalledWith({
        order: { categoryId: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

      const result = await service.findOne(1);

      expect(result).toEqual(mockCategory);
      expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { categoryId: 1 },
        relations: ['payments'],
      });
    });

    it('should throw NotFoundException when category not found', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const createCategoryDto = {
      categoryName: 'Hospital Bills',
      type: 'Outgoing',
      description: 'Medical expenses',
      status: 'Active',
      manager: 'Finance Team',
    };

    it('should create a new category successfully', async () => {
      mockCategoryRepository.create.mockReturnValue(mockCategory);
      mockCategoryRepository.save.mockResolvedValue(mockCategory);

      const result = await service.create(createCategoryDto);

      expect(result).toEqual(mockCategory);
      expect(mockCategoryRepository.create).toHaveBeenCalledWith(createCategoryDto);
      expect(mockCategoryRepository.save).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const updateCategoryDto = {
      status: 'Inactive',
    };

    it('should update a category successfully', async () => {
      const updatedCategory = { ...mockCategory, status: 'Inactive' };
      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
      mockCategoryRepository.save.mockResolvedValue(updatedCategory);

      const result = await service.update(1, updateCategoryDto);

      expect(result.status).toEqual('Inactive');
      expect(mockCategoryRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when category not found', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, updateCategoryDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete a category successfully', async () => {
      const categoryWithoutPayments = { ...mockCategory, payments: [] };
      mockCategoryRepository.findOne.mockResolvedValue(categoryWithoutPayments);
      mockCategoryRepository.remove.mockResolvedValue(categoryWithoutPayments);

      await service.remove(1);

      expect(mockCategoryRepository.remove).toHaveBeenCalledWith(categoryWithoutPayments);
    });

    it('should throw BadRequestException when category has payments', async () => {
      const categoryWithPayments = {
        ...mockCategory,
        payments: [{ paymentId: 1 }],
      };
      mockCategoryRepository.findOne.mockResolvedValue(categoryWithPayments);

      await expect(service.remove(1)).rejects.toThrow(BadRequestException);
      await expect(service.remove(1)).rejects.toThrow(
        'Cannot delete category with existing payments',
      );
    });

    it('should throw NotFoundException when category not found', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByType', () => {
    it('should return categories filtered by type', async () => {
      const categories = [mockCategory];
      mockCategoryRepository.find.mockResolvedValue(categories);

      const result = await service.findByType('Outgoing');

      expect(result).toEqual(categories);
      expect(mockCategoryRepository.find).toHaveBeenCalledWith({
        where: { type: 'Outgoing' },
        order: { categoryId: 'DESC' },
      });
    });
  });

  describe('findByStatus', () => {
    it('should return categories filtered by status', async () => {
      const categories = [mockCategory];
      mockCategoryRepository.find.mockResolvedValue(categories);

      const result = await service.findByStatus('Active');

      expect(result).toEqual(categories);
      expect(mockCategoryRepository.find).toHaveBeenCalledWith({
        where: { status: 'Active' },
        order: { categoryId: 'DESC' },
      });
    });
  });
});
