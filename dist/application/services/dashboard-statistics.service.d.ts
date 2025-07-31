import { Model } from 'mongoose';
export declare class DashboardStatisticsService {
    private userModel;
    private userSubscriptionModel;
    private newsletterModel;
    private courseModel;
    constructor(userModel: Model<any>, userSubscriptionModel: Model<any>, newsletterModel: Model<any>, courseModel: Model<any>);
    getEcommerceMetrics(): Promise<{
        customers: {
            total: number;
            growth: number;
            isPositive: boolean;
        };
        orders: {
            total: number;
            growth: number;
            isPositive: boolean;
        };
    }>;
    getMonthlySalesData(): Promise<{
        series: {
            name: string;
            data: any[];
        }[];
    }>;
    getStatisticsChartData(): Promise<{
        series: {
            name: string;
            data: any[];
        }[];
    }>;
    getCustomerDemographicData(): Promise<{
        userTypes: {
            name: any;
            value: any;
        }[];
        subscriptionStatus: {
            name: string;
            value: any;
        }[];
    }>;
    getRecentOrders(): Promise<any[]>;
    getMonthlyTargetData(): Promise<{
        series: {
            name: string;
            data: any[];
        }[];
    }>;
}
