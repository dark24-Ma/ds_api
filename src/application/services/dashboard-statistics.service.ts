import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DashboardStatisticsService {
  constructor(
    @InjectModel('User') private userModel: Model<any>,
    @InjectModel('UserSubscription') private userSubscriptionModel: Model<any>,
    @InjectModel('Newsletter') private newsletterModel: Model<any>,
    @InjectModel('Course') private courseModel: Model<any>,
  ) {}

  async getEcommerceMetrics() {
    const now = new Date();
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Compter les utilisateurs
    const totalUsers = await this.userModel.countDocuments();
    const newUsersThisMonth = await this.userModel.countDocuments({
      createdAt: { $gte: lastMonth }
    });
    const lastMonthUsers = await this.userModel.countDocuments({
      createdAt: { $gte: new Date(lastMonth.getTime() - 30 * 24 * 60 * 60 * 1000), $lt: lastMonth }
    });

    // Calculer le pourcentage de croissance des utilisateurs
    const userGrowthPercentage = lastMonthUsers > 0 
      ? ((newUsersThisMonth - lastMonthUsers) / lastMonthUsers * 100).toFixed(2)
      : '0';

    // Compter les souscriptions (comme "orders")
    const totalSubscriptions = await this.userSubscriptionModel.countDocuments();
    const newSubscriptionsThisMonth = await this.userSubscriptionModel.countDocuments({
      createdAt: { $gte: lastMonth }
    });
    const lastMonthSubscriptions = await this.userSubscriptionModel.countDocuments({
      createdAt: { $gte: new Date(lastMonth.getTime() - 30 * 24 * 60 * 60 * 1000), $lt: lastMonth }
    });

    // Calculer le pourcentage de croissance des souscriptions
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

    // Obtenir les données pour chaque mois
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(currentYear, month, 1);
      const endDate = new Date(currentYear, month + 1, 0, 23, 59, 59);

      // Compter les ventes (souscriptions)
      const monthlySubscriptions = await this.userSubscriptionModel.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }
      });

      // Calculer les revenus (en supposant un prix moyen par souscription)
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
    // Obtenir la distribution des types d'utilisateurs
    const userTypes = await this.userModel.aggregate([
      {
        $group: {
          _id: '$userType',
          count: { $sum: 1 }
        }
      }
    ]);

    // Obtenir la distribution par abonnements actifs
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
    
    // Calculer les données pour les 12 derniers mois
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
} 