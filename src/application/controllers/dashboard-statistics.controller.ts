import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardStatisticsService } from '../services/dashboard-statistics.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('dashboard-statistics')
@UseGuards(JwtAuthGuard)
export class DashboardStatisticsController {
  constructor(
    private readonly dashboardStatisticsService: DashboardStatisticsService,
  ) {}

  @Get('ecommerce-metrics')
  async getEcommerceMetrics() {
    return this.dashboardStatisticsService.getEcommerceMetrics();
  }

  @Get('monthly-sales')
  async getMonthlySales() {
    return this.dashboardStatisticsService.getMonthlySalesData();
  }

  @Get('statistics-chart')
  async getStatisticsChart() {
    return this.dashboardStatisticsService.getStatisticsChartData();
  }

  @Get('customer-demographic')
  async getCustomerDemographic() {
    return this.dashboardStatisticsService.getCustomerDemographicData();
  }

  @Get('recent-orders')
  async getRecentOrders() {
    return this.dashboardStatisticsService.getRecentOrders();
  }

  @Get('monthly-target')
  async getMonthlyTarget() {
    return this.dashboardStatisticsService.getMonthlyTargetData();
  }
} 