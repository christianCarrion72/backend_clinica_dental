import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PlanTratamientosService } from './plan-tratamientos.service';
import { CreatePlanTratamientoDto } from './dto/create-plan-tratamiento.dto';
import { UpdatePlanTratamientoDto } from './dto/update-plan-tratamiento.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('Plan Tratamientos')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('plan-tratamientos')
export class PlanTratamientosController {
  constructor(
    private readonly planTratamientosService: PlanTratamientosService,
  ) {}

  @Post()
  async create(@Body() createPlanTratamientoDto: CreatePlanTratamientoDto) {
    return await this.planTratamientosService.create(createPlanTratamientoDto);
  }

  @Get()
  async findAll() {
    return await this.planTratamientosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.planTratamientosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePlanTratamientoDto: UpdatePlanTratamientoDto,
  ) {
    return await this.planTratamientosService.update(
      id,
      updatePlanTratamientoDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.planTratamientosService.remove(id);
  }
}
