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
import { EstadoCivilsService } from './estado_civils.service';
import { CreateEstadoCivilDto } from './dto/create-estado-civil.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { Roles } from '../auth/enums/roles.enum';
import { UpdateEstadoCivilDto } from './dto/update-estado_civil.dto';

@ApiTags('estado-civil')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('estado-civil')
export class EstadoCivilsController {
  constructor(private readonly estadoCivilsService: EstadoCivilsService) {}

  @Post()
  @HasRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  create(@Body() createEstadoCivilDto: CreateEstadoCivilDto) {
    return this.estadoCivilsService.create(createEstadoCivilDto);
  }

  @Get()
  @HasRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  findAll() {
    return this.estadoCivilsService.findAll();
  }

  @Get(':id')
  @HasRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  findOne(@Param('id') id: string) {
    return this.estadoCivilsService.findOne(+id);
  }

  @Patch(':id')
  @HasRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  update(
    @Param('id') id: string,
    @Body() updateEstadoCivilDto: UpdateEstadoCivilDto,
  ) {
    return this.estadoCivilsService.update(+id, updateEstadoCivilDto);
  }

  @Delete(':id')
  @HasRoles(Roles.ADMIN, Roles.DENTIST, Roles.ADMINISTRATIVE)
  remove(@Param('id') id: string) {
    return this.estadoCivilsService.remove(+id);
  }
}
