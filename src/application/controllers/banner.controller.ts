import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannerService } from '../services/banner.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Banner } from '../../domain/entities/banner.entity';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createBannerDto: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Banner> {
    if (!file) {
      throw new BadRequestException('Image de bannière requise');
    }

    const bannerData = {
      title: createBannerDto.title,
      description: createBannerDto.description,
      linkUrl: createBannerDto.linkUrl,
      targetAudience: createBannerDto.targetAudience || 'all',
      displayOrder: parseInt(createBannerDto.displayOrder) || 1,
      isActive: createBannerDto.isActive === 'true',
      startDate: createBannerDto.startDate ? new Date(createBannerDto.startDate) : undefined,
      endDate: createBannerDto.endDate ? new Date(createBannerDto.endDate) : undefined,
    };

    return this.bannerService.create(bannerData, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() filters: any): Promise<Banner[]> {
    const queryFilters = {
      isActive: filters.isActive !== undefined ? filters.isActive === 'true' : undefined,
      targetAudience: filters.targetAudience,
      search: filters.search,
    };
    
    // Nettoyer les filtres undefined
    Object.keys(queryFilters).forEach(key => 
      queryFilters[key] === undefined && delete queryFilters[key]
    );

    return this.bannerService.findAll(queryFilters);
  }

  @Get('active')
  async findActiveBanners(): Promise<Banner[]> {
    return this.bannerService.findActiveBanners();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateBannerDto: any,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Banner> {
    const updateData = {
      title: updateBannerDto.title,
      description: updateBannerDto.description,
      linkUrl: updateBannerDto.linkUrl,
      targetAudience: updateBannerDto.targetAudience,
      displayOrder: updateBannerDto.displayOrder ? parseInt(updateBannerDto.displayOrder) : undefined,
      isActive: updateBannerDto.isActive !== undefined ? updateBannerDto.isActive === 'true' : undefined,
      startDate: updateBannerDto.startDate ? new Date(updateBannerDto.startDate) : undefined,
      endDate: updateBannerDto.endDate ? new Date(updateBannerDto.endDate) : undefined,
    };

    // Nettoyer les valeurs undefined
    Object.keys(updateData).forEach(key => 
      updateData[key] === undefined && delete updateData[key]
    );

    return this.bannerService.update(id, updateData, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.bannerService.delete(id);
    return { message: 'Bannière supprimée avec succès' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle-status')
  async toggleStatus(@Param('id') id: string): Promise<Banner> {
    return this.bannerService.toggleStatus(id);
  }

  @Post(':id/click')
  async trackClick(@Param('id') id: string): Promise<{ message: string }> {
    await this.bannerService.trackClick(id);
    return { message: 'Clic enregistré' };
  }

  @Post(':id/impression')
  async trackImpression(@Param('id') id: string): Promise<{ message: string }> {
    await this.bannerService.trackImpression(id);
    return { message: 'Impression enregistrée' };
  }

  @UseGuards(JwtAuthGuard)
  @Put('order')
  async updateOrder(@Body() orderData: { banners: { id: string, displayOrder: number }[] }): Promise<{ message: string }> {
    await this.bannerService.updateOrder(orderData.banners);
    return { message: 'Ordre des bannières mis à jour' };
  }
} 