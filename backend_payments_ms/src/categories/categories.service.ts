import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: { categoryId: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: id },
      relations: ['payments'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: id },
      relations: ['payments'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // Check if category has associated payments
    if (category.payments && category.payments.length > 0) {
      throw new BadRequestException(
        `Cannot delete category with existing payments. Found ${category.payments.length} associated payment(s).`,
      );
    }

    await this.categoryRepository.remove(category);
  }

  async findByType(type: string): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { type },
      order: { categoryId: 'DESC' },
    });
  }

  async findByStatus(status: string): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { status },
      order: { categoryId: 'DESC' },
    });
  }
}
