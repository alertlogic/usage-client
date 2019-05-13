/**
 * Module to deal with available Ticket Master Public API endpoints
 */
import { ALClient } from '@al/client';

export interface EnvironmentStatusResponse {
  set_at?: number;
  reason?: string;
  status_type?: string;
  year_month_day?: string;
}

export interface EnvironmentResponse {
  environment_id?: string;
  statuses?: EnvironmentStatusResponse[];
}

export interface AccountStatusReponse {
  account_id?: string;
  environment_id?: string;
  environment_ids?: EnvironmentResponse[];
}

export interface StatusData {
  account_id?: string;
  environment_id?: string;
  year_month_day?: string;
  type?: string;
  reason?: string;
}

export interface DeploymentTuples {
  year_month_day?: string;
  hours?: any;
}

export interface DeploymentsUsageResponse {
  account_id?: string;
  deployments?: DeploymentTuples[];
}

export interface DeploymentHostDetailResponse {
  account_id?: string;
  environment_id?: string;
  host?: string;
  year_month_day?: string;
  hours?: number[];
  expired?: string;
}

export interface DailyUsageEnvironmentSummary {
  environment_id?: string;
  host_days?: number;
}

export interface DailyUsageSummary {
  account_id?: string;
  year_month_day?: string;
  host_days?: number;
  environment_ids?: DailyUsageEnvironmentSummary[];
}

export interface MaxDailyTuples {
  hour?: number;
  hosts?: number;
}

export interface MonthlyDeployUsageHistoryResponse {
  account_id?: string;
  deployments?: DeploymentTuples[];
}

export interface MaxDailyEnvironments {
  environment_id?: string;
  total_host_hours?: number;
  max_hosts?: number;
  host_hours?: MaxDailyTuples[];
  paused_since?: string;
}

export interface MaxDailyUsageSummary {
  account_id?: string;
  year_month_day?: string;
  total_host_hours?: number;
  max_hosts?: number;
  environment_ids?: MaxDailyEnvironments[];
}

export interface MaxDailyHostUsageDetail {
  hours?: number[];
  start_times?: number[];
  stop_times?: number[];
  expire_times?: number[];
  [index:string]: any;
}

export interface MaxDailyUsageDetail {
  account_id?: string;
  environment_id?: string;
  year_month_day?: string;
  total_host_hours?: number;
  max_hosts?: number;
  hosts?: MaxDailyHostUsageDetail[];
}

export interface MaxHourlyUsageSummary {
  account_id?: string;
  year_month_day_hour?: string;
  max_hosts: number;
  environment_ids?: MaxDailyEnvironments[];
}

export interface MonthlyUsageHostDetail {
  key?: string;
  days?: number[];
}

export interface MonthlyUsageDetailResponse {
  account_id?: string;
  environment_id?: string;
  year_month?: string;
  host_days?: number;
  hosts?: MonthlyUsageHostDetail[];
}

export interface MonthlyEnvironmentUsageSummaryResponse {
  account_id?: string;
  year_month?: string;
  host_days?: number;
  environment_ids?: DailyUsageEnvironmentSummary[];
}

class UsageClient {

  private alClient = ALClient;
  private serviceName = 'usage';

  /**
   * Delete Status
   * DELETE
   * /usage/status/v1/status/:account_id/:environment_id/:year/:month/:day/:type
   * "https://api.cloudinsight.alertlogic.com/usage/status/v1/status/01000001/38187AC7-FD71-4292-A8C0-2A52AF863638/2015/10/11/paused"
   */
  async deleteStatus(accountId: string, environmentId: string, year: string, month: string, day: string, type: string) {
    const status = await this.alClient.delete({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'status/v1/status',
      path: `/${environmentId}/${year}/${month}/${day}/${type}`,
    });
    return status;
  }

  /**
   * List Account Statuses
   * GET
   * /usage/status/v1/list/:account_id
   * "https://api.cloudinsight.alertlogic.com/usage/status/v1/list/01000001"
   */
  async listAccountStatus(accountId: string) {
    const status = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'status/v1/list',
    });
    return status as AccountStatusReponse;
  }

  /**
   * List Account/Environment Statuses
   * GET
   * /usage/status/v1/list/:account_id/:environment_id
   * "https://api.cloudinsight.alertlogic.com/usage/status/v1/list/01000001/38187AC7-FD71-4292-A8C0-2A52AF863638"
   */
  async listAccountEnvironmentStatus(accountId: string, environmentId: string) {
    const status = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'status/v1/list',
      path: `/${environmentId}`,
    });
    return status as AccountStatusReponse;
  }

  /**
   * Post Status
   * POST
   * /usage/status/v1/status
   * "https://api.cloudinsight.alertlogic.com/usage/status/v1/status"
   * -d '{"account_id": "01000001", "environment_id": "38187AC7-FD71-4292-A8C0-2A52AF863638", "year_month_day": "20151010", "type": "paused", "reason": "some reason"}'
   */
  async postStatus(statusData: StatusData) {
    const status = await this.alClient.post({
      service_name: this.serviceName,
      version: 'status/v1/status',
      data: statusData,
    });
    return status;
  }

  /**
   * Return number of Deployments for this Account
   * GET
   * /usage/v3/:account_id/deployments/count
   * "https://api.cloudinsight.alertlogic.com/usage/v3/01000001/deployments/count"
   */
  async getDeploymentCount(accountId: string) {
    const status = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v3',
      path: '/deployments/count',
    });
    return status as DeploymentsUsageResponse;
  }

  /**
   * Get Daily Deployments Usage history
   * GET
   * /usage/v3/:account_id/deployments/count/:year/:month/:day
   * "https://api.cloudinsight.alertlogic.com/usage/v3/01000001/deployments/count/2017/11/02"
   */
  async getDeploymentUsageHistory(accountId: string, year: string, month: string, day: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v3',
      path: `/deployments/count/${year}/${month}/${day}`,
    });
    return usage as DeploymentsUsageResponse;
  }

  /**
   * Get Daily Host Usage (Detailed)
   * GET
   * /usage/v2/:account_id/:env_id/:host/detail/:year/:month/:day
   * "https://api.cloudinsight.alertlogic.com/usage/v2/01000001/582C62B4-9D1D-4F1C-9117-BE4198198861/Example-Host/detail/2015/1/1"
   */
  async getDailyHostUsage(accountId: string, environmentId: string, hostId: string, year: string, month: string, day: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v2',
      path: `/${environmentId}/${hostId}/detail/${year}/${month}/${day}`,
    });
    return usage as DeploymentHostDetailResponse;
  }

  /**
   * Get Daily Usage (Summary)
   * GET
   * /usage/v2/:account_id/summary/:year/:month/:day
   * "https://api.cloudinsight.alertlogic.com/usage/v2/01000001/summary/2015/1/1"
   */
  async getDailyUsageSummary(accountId: string, year: string, month: string, day: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v2',
      path: `/summary/${year}/${month}/${day}`,
    });
    return usage as DailyUsageSummary;
  }

  /**
   * Get Max Hosts Daily Usage (Summary)
   * GET
   * /usage/v3/:account_id/summary/:year/:month/:day
   * "https://api.cloudinsight.alertlogic.com/usage/v2/01000001/summary/2015/1/1"
   */
  async getMaxHostDailyUsageSummary(accountId: string, year: string, month: string, day: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v3',
      path: `/summary/${year}/${month}/${day}`,
    });
    return usage as MaxDailyUsageSummary;
  }

  /**
   * Get Max Hosts Daily Usage (Detailed)
   * GET
   * /usage/v3/:account_id/:environment_id/detail/:year/:month/:day
   * "https://api.cloudinsight.alertlogic.com/usage/v3/01000001/582C62B4-9D1D-4F1C-9117-BE4198198861/detail/2015/1/1"
   */
  async getMaxHostDailyUsageDetail(accountId: string, environmentId: string, year: string, month: string, day: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v3',
      path: `/${environmentId}/detail/${year}/${month}/${day}`,
    });
    return usage as MaxDailyUsageDetail;
  }

  /**
   * Get Max Hosts Hourly Usage (Summary)
   * GET
   * /usage/v3/:account_id/summary/:year/:month/:day/:hour
   * "https://api.cloudinsight.alertlogic.com/usage/v2/01000001/summary/2015/1/1/12"
   */
  async getMaxHostHourlyUsageSummary(accountId: string, year: string, month: string, day: string, hour: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v3',
      path: `/summary/${year}/${month}/${day}/${hour}`,
    });
    return usage as MaxHourlyUsageSummary;
  }

  /**
   * Get Monthly Deployments Usage history
   * GET
   * /usage/v3/:account_id/deployments/count/:year/:month
   * "https://api.cloudinsight.alertlogic.com/usage/v3/01000001/deployments/count/2017/11"
   */
  async getMonthlyDeploymentsUsageHistory(accountId: string, year: string, month: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v3',
      path: `/deployments/count/${year}/${month}`,
    });
    return usage as MonthlyDeployUsageHistoryResponse;
  }

  /**
   * Get Monthly Environment Usage (Detailed)
   * GET
   * /usage/v2/:account_id/:env_id/detail/:year/:month
   * "https://api.cloudinsight.alertlogic.com/usage/v2/01000001/582C62B4-9D1D-4F1C-9117-BE4198198861/detail/2017/11"
   */
  async getMonthlyDeploymentsUsageDetail(accountId: string, environmentId: string, year: string, month: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v2',
      path: `/${environmentId}/detail/${year}/${month}`,
    });
    return usage as MonthlyUsageDetailResponse;
  }

  /**
   * Get Monthly Environment Usage (Summary)
   * GET
   * /usage/v2/:account_id/summary/:year/:month
   * "https://api.cloudinsight.alertlogic.com/usage/v2/01000001/582C62B4-9D1D-4F1C-9117-BE4198198861/summary/2017/11"
   */
  async getMonthlyDeploymentsUsageSummary(accountId: string, environmentId: string, year: string, month: string) {
    const usage = await this.alClient.fetch({
      account_id: accountId,
      service_name: this.serviceName,
      version: 'v2',
      path: `/${environmentId}/summary/${year}/${month}`,
    });
    return usage as MonthlyEnvironmentUsageSummaryResponse;
  }

}

export const usageClient = new UsageClient();
