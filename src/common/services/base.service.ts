import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BaseCrudService<
  T,
  FindFirstArg,
  FindUniqueArg,
  FindManyArg,
  GroupByArg,
  AggregateArg,
  CreateArg,
  CreateManyArg,
  UpdateArg,
  UpdatedManyArg,
  DeleteArg,
  DeleteManyArg,
> {
  modelName: string;
  constructor(private prisma: PrismaService) {
    this.modelName = this.getModelName();
  }

  async findFirst(args: FindFirstArg): Promise<T | null> {
    try {
      return await this.prisma[this.modelName].findFirst(args);
    } catch (err) {
      return null;
    }
  }
  async findUnique(args: FindUniqueArg): Promise<T | null> {
    return this.prisma[this.modelName].findUnique(args);
  }

  async findMany(args: FindManyArg): Promise<T[]> {
    return this.prisma[this.modelName].findMany(args);
  }

  async groupBy(args: GroupByArg) {
    return this.prisma[this.modelName].groupBy(args);
  }

  async aggregate(args: AggregateArg) {
    return this.prisma[this.modelName].aggregate(args);
  }

  async create(args: CreateArg): Promise<T> {
    return this.prisma[this.modelName].create(args);
  }

  async createMany(args: CreateManyArg) {
    return this.prisma[this.modelName].createMany(args);
  }

  async update(args: UpdateArg): Promise<T> {
    return this.prisma[this.modelName].update(args);
  }

  async updateMany(args: UpdatedManyArg): Promise<T[]> {
    return this.prisma[this.modelName].updateMany(args);
  }

  async delete(args: DeleteArg): Promise<T> {
    return this.prisma[this.modelName].delete(args);
  }

  async deleteMany(args: DeleteManyArg): Promise<T[]> {
    return this.prisma[this.modelName].deleteMany(args);
  }

  private getModelName(): string {
    const modelName = this.constructor.name
      .replace('Service', '')
      .toLowerCase();

    return modelName;
  }
}
