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
import { ProcedimientosService } from './procedimientos.service';
import { CreateProcedimientoDto } from './dto/create-procedimiento.dto';
import { UpdateProcedimientoDto } from './dto/update-procedimiento.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('procedimientos')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('procedimientos')
export class ProcedimientosController {
  constructor(private readonly procedimientosService: ProcedimientosService) {}

  @Post()
  async create(@Body() createProcedimientoDto: CreateProcedimientoDto) {
    return await this.procedimientosService.create(createProcedimientoDto);
  }

  @Get()
  async findAll() {
    return await this.procedimientosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.procedimientosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProcedimientoDto: UpdateProcedimientoDto,
  ) {
    return await this.procedimientosService.update(id, updateProcedimientoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.procedimientosService.remove(id);
  }
}
