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
import { ExamenBucalsService } from './examen-bucals.service';
import { CreateExamenBucalDto } from './dto/create-examen-bucal.dto';
import { UpdateExamenBucalDto } from './dto/update-examen-bucal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('examen bucal')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('examen-bucals')
export class ExamenBucalsController {
  constructor(private readonly examenBucalsService: ExamenBucalsService) {}

  @Post()
  async create(@Body() createExamenBucalDto: CreateExamenBucalDto) {
    return await this.examenBucalsService.create(createExamenBucalDto);
  }

  @Get()
  async findAll() {
    return await this.examenBucalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.examenBucalsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateExamenBucalDto: UpdateExamenBucalDto,
  ) {
    return await this.examenBucalsService.update(id, updateExamenBucalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.examenBucalsService.remove(id);
  }
}
