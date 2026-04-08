import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserTypesGuard } from '../auth/guards/user-types.guard';
import { StaffRolesGuard } from '../auth/guards/staff-roles.guard';
import { AllowedUserTypes } from '../auth/decorators/allowed-user-types.decorator';
import { AllowedStaffRoles } from '../auth/decorators/allowed-staff-roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { JwtUser } from '../auth/types/jwt-user';
import { UserRole } from './entities/user.entity';
import { UpdateStaffProfileDto } from './dto/update-staff-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @AllowedUserTypes('STAFF')
  async me(@CurrentUser() user: JwtUser) {
    const row = await this.usersService.findById(user.id);
    return row;
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @AllowedUserTypes('STAFF')
  async updateMe(
    @CurrentUser() user: JwtUser,
    @Body() dto: UpdateStaffProfileDto,
  ) {
    return this.usersService.updateProfile(user.id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserTypesGuard, StaffRolesGuard)
  @AllowedUserTypes('STAFF')
  @AllowedStaffRoles(UserRole.ADMIN)
  async listStaff() {
    return this.usersService.findAllPublic();
  }
}
