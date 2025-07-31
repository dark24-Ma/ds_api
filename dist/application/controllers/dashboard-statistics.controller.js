"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardStatisticsController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_statistics_service_1 = require("../services/dashboard-statistics.service");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let DashboardStatisticsController = class DashboardStatisticsController {
    constructor(dashboardStatisticsService) {
        this.dashboardStatisticsService = dashboardStatisticsService;
    }
    async getEcommerceMetrics() {
        return this.dashboardStatisticsService.getEcommerceMetrics();
    }
    async getMonthlySales() {
        return this.dashboardStatisticsService.getMonthlySalesData();
    }
    async getStatisticsChart() {
        return this.dashboardStatisticsService.getStatisticsChartData();
    }
    async getCustomerDemographic() {
        return this.dashboardStatisticsService.getCustomerDemographicData();
    }
    async getRecentOrders() {
        return this.dashboardStatisticsService.getRecentOrders();
    }
    async getMonthlyTarget() {
        return this.dashboardStatisticsService.getMonthlyTargetData();
    }
};
exports.DashboardStatisticsController = DashboardStatisticsController;
__decorate([
    (0, common_1.Get)('ecommerce-metrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardStatisticsController.prototype, "getEcommerceMetrics", null);
__decorate([
    (0, common_1.Get)('monthly-sales'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardStatisticsController.prototype, "getMonthlySales", null);
__decorate([
    (0, common_1.Get)('statistics-chart'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardStatisticsController.prototype, "getStatisticsChart", null);
__decorate([
    (0, common_1.Get)('customer-demographic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardStatisticsController.prototype, "getCustomerDemographic", null);
__decorate([
    (0, common_1.Get)('recent-orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardStatisticsController.prototype, "getRecentOrders", null);
__decorate([
    (0, common_1.Get)('monthly-target'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardStatisticsController.prototype, "getMonthlyTarget", null);
exports.DashboardStatisticsController = DashboardStatisticsController = __decorate([
    (0, common_1.Controller)('dashboard-statistics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dashboard_statistics_service_1.DashboardStatisticsService])
], DashboardStatisticsController);
//# sourceMappingURL=dashboard-statistics.controller.js.map