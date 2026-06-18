import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Gym, GymDocument } from './schemas/gym.schema';

import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';

@Injectable()
export class GymService {
  constructor(
    @InjectModel(Gym.name)
    private gymModel: Model<GymDocument>,
  ) {}

  // Create Gym
  async create(createGymDto: CreateGymDto) {
    const gym = new this.gymModel(createGymDto);

    return await gym.save();
  }

  // Get All Gyms
  async findAll() {
    return await this.gymModel.find();
  }

  // Get Gym By ID
  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Gym ID');
    }

    const gym = await this.gymModel.findById(id);

    if (!gym) {
      throw new NotFoundException('Gym not found');
    }

    return gym;
  }

  // Update Gym
  async update(id: string, updateGymDto: UpdateGymDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Gym ID');
    }

    const gym = await this.gymModel.findByIdAndUpdate(
      id,
      updateGymDto,
      {
        new: true,
      },
    );

    if (!gym) {
      throw new NotFoundException('Gym not found');
    }

    return gym;
  }

  // Delete Gym
  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Gym ID');
    }

    const gym = await this.gymModel.findByIdAndDelete(id);

    if (!gym) {
      throw new NotFoundException('Gym not found');
    }

    return {
      message: 'Gym deleted successfully',
    };
  }
}