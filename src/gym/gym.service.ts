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

  // CREATE
  async create(createGymDto: CreateGymDto) {
    const gym = new this.gymModel(createGymDto);
    return await gym.save();
  }

  // GET ALL (Pagination + Filter + Sort)
  async findAll(query: any) {
    const page = Number(query.page) > 0 ? Number(query.page) : 1;
    const limit = Number(query.limit) > 0 ? Number(query.limit) : 5;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.location) {
      filter.location = query.location;
    }

    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' };
    }

    const sort: any = {};

    if (query.sortBy) {
      sort[query.sortBy] = query.order === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const gyms = await this.gymModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await this.gymModel.countDocuments(filter);

    return {
      data: gyms,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }

  // GET BY ID
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

  // UPDATE
  async update(id: string, updateGymDto: UpdateGymDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Gym ID');
    }

    const gym = await this.gymModel.findByIdAndUpdate(
      id,
      updateGymDto,
      { new: true },
    );

    if (!gym) {
      throw new NotFoundException('Gym not found');
    }

    return gym;
  }

  // DELETE
  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Gym ID');
    }

    const gym = await this.gymModel.findByIdAndDelete(id);

    if (!gym) {
      throw new NotFoundException('Gym not found');
    }

    return { message: 'Gym deleted successfully' };
  }

  // ANALYTICS
  async getAnalytics() {
    const totalGyms = await this.gymModel.countDocuments();

    const locationStats = await this.gymModel.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      totalGyms,
      locationStats,
    };
  }
}