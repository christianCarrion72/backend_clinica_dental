import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamiliarsService } from './familiars.service';
import { CreateFamiliarDto } from './dto/create-familiar.dto';
import { UpdateFamiliarDto } from './dto/update-familiar.dto';

@Controller('familiars')
export class FamiliarsController {
  constructor(private readonly familiarsService: FamiliarsService) {}

  @Post()
  create(@Body() createFamiliarDto: CreateFamiliarDto) {
    return this.familiarsService.create(createFamiliarDto);
  }

  @Get()
  findAll() {
    return this.familiarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiarsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamiliarDto: UpdateFamiliarDto) {
    return this.familiarsService.update(+id, updateFamiliarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiarsService.remove(+id);
  }
}
