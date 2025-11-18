import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanTratamientosService } from './plan-tratamientos.service';
import { CreatePlanTratamientoDto } from './dto/create-plan-tratamiento.dto';
import { UpdatePlanTratamientoDto } from './dto/update-plan-tratamiento.dto';

@Controller('plan-tratamientos')
export class PlanTratamientosController {
  constructor(private readonly planTratamientosService: PlanTratamientosService) {}

  @Post()
  create(@Body() createPlanTratamientoDto: CreatePlanTratamientoDto) {
    return this.planTratamientosService.create(createPlanTratamientoDto);
  }

  @Get()
  findAll() {
    return this.planTratamientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planTratamientosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanTratamientoDto: UpdatePlanTratamientoDto) {
    return this.planTratamientosService.update(+id, updatePlanTratamientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planTratamientosService.remove(+id);
  }
}
