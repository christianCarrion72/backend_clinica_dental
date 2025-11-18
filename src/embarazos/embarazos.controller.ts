import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmbarazosService } from './embarazos.service';
import { CreateEmbarazoDto } from './dto/create-embarazo.dto';
import { UpdateEmbarazoDto } from './dto/update-embarazo.dto';

@Controller('embarazos')
export class EmbarazosController {
  constructor(private readonly embarazosService: EmbarazosService) {}

  @Post()
  create(@Body() createEmbarazoDto: CreateEmbarazoDto) {
    return this.embarazosService.create(createEmbarazoDto);
  }

  @Get()
  findAll() {
    return this.embarazosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.embarazosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmbarazoDto: UpdateEmbarazoDto) {
    return this.embarazosService.update(+id, updateEmbarazoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.embarazosService.remove(+id);
  }
}
