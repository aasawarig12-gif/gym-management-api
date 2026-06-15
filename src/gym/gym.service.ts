import { Injectable } from '@nestjs/common';

@Injectable()
export class GymService {
  private gyms = [
    {
      id: 1,
      name: 'Gold Gym',
      location: 'Pune',
    },
  ];

  getAllGyms() {
    return this.gyms;
  }

  addGym(gym: any) {
    this.gyms.push(gym);

    return {
      message: 'Gym Added Successfully',
      data: gym,
    };
  }
}