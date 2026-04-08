import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { User } from './entities/user.entity';

const publicUserSelect: FindOptionsSelect<User> = {
  id: true,
  email: true,
  role: true,
  firstName: true,
  lastName: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'passwordHash', 'role', 'firstName', 'lastName'],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      select: publicUserSelect,
    });
  }

  async findAllPublic(): Promise<User[]> {
    return this.usersRepository.find({
      select: publicUserSelect,
      order: { createdAt: 'DESC' },
    });
  }

  async updateProfile(
    id: string,
    patch: Pick<User, 'firstName' | 'lastName'>,
  ): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    await this.usersRepository.update(
      { id },
      { firstName: patch.firstName, lastName: patch.lastName },
    );
    const updated = await this.findById(id);
    if (!updated) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return updated;
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    return this.usersRepository.save(newUser);
  }
}
