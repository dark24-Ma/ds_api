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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardStatisticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DashboardStatisticsService = class DashboardStatisticsService {
    constructor(userModel, userSubscriptionModel, newsletterModel, courseModel) {
        this.userModel = userModel;
        this.userSubscriptionModel = userSubscriptionModel;
        this.newsletterModel = newsletterModel;
        this.courseModel = courseModel;
    }
    async getEcommerceMetrics() {
        const now = new Date();
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const totalUsers = await this.userModel.countDocuments();
        const newUsersThisMonth = await this.userModel.countDocuments({
            createdAt: { $gte: lastMonth }
        });
        const lastMonthUsers = await this.userModel.countDocuments({
            createdAt: { $gte: new Date(lastMonth.getTime() - 30 * 24 * 60 * 60 * 1000), $lt: lastMonth }
        });
        const userGrowthPercentage = lastMonthUsers > 0
            ? ((newUsersThisMonth - lastMonthUsers) / lastMonthUsers * 100).toFixed(2)
            : '0';
        const totalSubscriptions = await this.userSubscriptionModel.countDocuments();
        const newSubscriptionsThisMonth = await this.userSubscriptionModel.countDocuments({
            createdAt: { $gte: lastMonth }
        });
        const lastMonthSubscriptions = await this.userSubscriptionModel.countDocuments({
            createdAt: { $gte: new Date(lastMonth.getTime() - 30 * 24 * 60 * 60 * 1000), $lt: lastMonth }
        });
        const subscriptionGrowthPercentage = lastMonthSubscriptions > 0
            ? ((newSubscriptionsThisMonth - lastMonthSubscriptions) / lastMonthSubscriptions * 100).toFixed(2)
            : '0';
        return {
            customers: {
                total: totalUsers,
                growth: parseFloat(userGrowthPercentage),
                isPositive: parseFloat(userGrowthPercentage) >= 0
            },
            orders: {
                total: totalSubscriptions,
                growth: parseFloat(subscriptionGrowthPercentage),
                isPositive: parseFloat(subscriptionGrowthPercentage) >= 0
            }
        };
    }
    async getMonthlySalesData() {
        const currentYear = new Date().getFullYear();
        const monthlyData = [];
        for (let month = 0; month < 12; month++) {
            const startDate = new Date(currentYear, month, 1);
            const endDate = new Date(currentYear, month + 1, 0, 23, 59, 59);
            const monthlySales = await this.userSubscriptionModel.countDocuments({
                createdAt: { $gte: startDate, $lte: endDate }
            });
            monthlyData.push(monthlySales);
        }
        return {
            series: [
                {
                    name: 'Souscriptions',
                    data: monthlyData
                }
            ]
        };
    }
    async getStatisticsChartData() {
        const currentYear = new Date().getFullYear();
        const salesData = [];
        const revenueData = [];
        for (let month = 0; month < 12; month++) {
            const startDate = new Date(currentYear, month, 1);
            const endDate = new Date(currentYear, month + 1, 0, 23, 59, 59);
            const monthlySubscriptions = await this.userSubscriptionModel.countDocuments({
                createdAt: { $gte: startDate, $lte: endDate }
            });
            const monthlyRevenue = await this.userSubscriptionModel.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startDate, $lte: endDate }
                    }
                },
                {
                    $lookup: {
                        from: 'subscriptiontypes',
                        localField: 'subscriptionTypeId',
                        foreignField: '_id',
                        as: 'subscriptionType'
                    }
                },
                {
                    $unwind: '$subscriptionType'
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$subscriptionType.price' }
                    }
                }
            ]);
            salesData.push(monthlySubscriptions);
            revenueData.push(monthlyRevenue.length > 0 ? monthlyRevenue[0].totalRevenue : 0);
        }
        return {
            series: [
                {
                    name: 'Ventes',
                    data: salesData
                },
                {
                    name: 'Revenus',
                    data: revenueData
                }
            ]
        };
    }
    async getCustomerDemographicData() {
        const userTypes = await this.userModel.aggregate([
            {
                $group: {
                    _id: '$userType',
                    count: { $sum: 1 }
                }
            }
        ]);
        const subscriptionStatus = await this.userSubscriptionModel.aggregate([
            {
                $group: {
                    _id: '$isActive',
                    count: { $sum: 1 }
                }
            }
        ]);
        return {
            userTypes: userTypes.map(type => ({
                name: type._id || 'Non défini',
                value: type.count
            })),
            subscriptionStatus: subscriptionStatus.map(status => ({
                name: status._id ? 'Actif' : 'Inactif',
                value: status.count
            }))
        };
    }
    async getRecentOrders() {
        const recentSubscriptions = await this.userSubscriptionModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $lookup: {
                    from: 'subscriptiontypes',
                    localField: 'subscriptionTypeId',
                    foreignField: '_id',
                    as: 'subscriptionType'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $unwind: '$subscriptionType'
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $limit: 10
            },
            {
                $project: {
                    id: '$_id',
                    customerName: { $concat: ['$user.firstname', ' ', '$user.name'] },
                    email: '$user.email',
                    subscriptionType: '$subscriptionType.name',
                    amount: '$subscriptionType.price',
                    status: {
                        $cond: {
                            if: '$isActive',
                            then: 'Actif',
                            else: 'Inactif'
                        }
                    },
                    date: '$createdAt'
                }
            }
        ]);
        return recentSubscriptions;
    }
    async getMonthlyTargetData() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const monthlyData = [];
        for (let i = 11; i >= 0; i--) {
            const targetMonth = currentMonth - i;
            const year = targetMonth < 0 ? currentYear - 1 : currentYear;
            const month = targetMonth < 0 ? 12 + targetMonth : targetMonth;
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0, 23, 59, 59);
            const monthlySubscriptions = await this.userSubscriptionModel.countDocuments({
                createdAt: { $gte: startDate, $lte: endDate }
            });
            monthlyData.push(monthlySubscriptions);
        }
        return {
            series: [
                {
                    name: 'Objectifs',
                    data: monthlyData
                }
            ]
        };
    }
};
exports.DashboardStatisticsService = DashboardStatisticsService;
exports.DashboardStatisticsService = DashboardStatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('UserSubscription')),
    __param(2, (0, mongoose_1.InjectModel)('Newsletter')),
    __param(3, (0, mongoose_1.InjectModel)('Course')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardStatisticsService);
//# sourceMappingURL=dashboard-statistics.service.js.map