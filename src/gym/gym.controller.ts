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
} from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';

import { GymService } from './gym.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('gym')
export class GymController {
  constructor(
    private readonly gymService: GymService,
  ) {}

  // ==========================
  // Authenticated Users
  // ==========================

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllGyms() {
    return this.gymService.findAll();
  }


  // ==========================
  // Admin Only
  // ==========================

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createGym(
    @Body() dto: any,
  ) {
    return this.gymService.create(dto);
  }


  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  updateGym(
    @Param('id') id: string,

    @Body() dto: any,
  ) {
    return this.gymService.update(
      id,
      dto,
    );
  }


  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  deleteGym(
    @Param('id') id: string,
  ) {
    return this.gymService.remove(id);
  }


  // ==========================
  // Debug Route
  // ==========================

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('debug')
  debug(
    @Req() req,
  ) {
    return req.user;
  }


  // ==========================
  // Current User Route
  // ==========================

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(
    @CurrentUser()
    user: any,
  ) {
    return user;
  }
}