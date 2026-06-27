import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Membership,
  MembershipDocument,
} from './schemas/membership.schema';

@Injectable()
export class MembershipsService {

  constructor(

    @InjectModel(Membership.name)
    private membershipModel:
      Model<MembershipDocument>,

  ) {}

async findAll() {

    return this.membershipModel.find();

}

}