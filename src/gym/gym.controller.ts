import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { GymService } from './gym.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { QueryGymDto } from './dto/query-gym.dto';

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  // GET ALL GYMS
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get()
  findAll(@Query() query: QueryGymDto) {
    return this.gymService.findAll(query);
  }

  // CREATE GYM (ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles('admin')
  @Post()
  createGym(@Body() dto: CreateGymDto) {
    return this.gymService.create(dto);
  }

  // UPDATE GYM (ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles('admin')
  @Put(':id')
  updateGym(@Param('id') id: string, @Body() dto: UpdateGymDto) {
    return this.gymService.update(id, dto);
  }

  // DELETE GYM (ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles('admin')
  @Delete(':id')
  deleteGym(@Param('id') id: string) {
    return this.gymService.remove(id);
  }

  // ANALYTICS
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('analytics')
  getAnalytics() {
    return this.gymService.getAnalytics();
  }

  @Get('debug')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
debug(@Req() req) {
  return {
    headers: req.headers,
    user: req.user,
  };
}

  // CURRENT USER
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('me')
  getMe(@CurrentUser() user: any) {
    return user;
  }
}