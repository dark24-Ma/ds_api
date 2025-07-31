import { DashboardStatisticsService } from '../services/dashboard-statistics.service';
export declare class DashboardStatisticsController {
    private readonly dashboardStatisticsService;
    constructor(dashboardStatisticsService: DashboardStatisticsService);
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
    getMonthlySales(): Promise<{
        series: {
            name: string;
            data: any[];
        }[];
    }>;
    getStatisticsChart(): Promise<{
        series: {
            name: string;
            data: any[];
        }[];
    }>;
    getCustomerDemographic(): Promise<{
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
    getMonthlyTarget(): Promise<{
        series: {
            name: string;
            data: any[];
        }[];
    }>;
}
