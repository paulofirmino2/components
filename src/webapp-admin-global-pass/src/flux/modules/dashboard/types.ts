export type Dashboard = {
  total_employee: number;
  in_total: number;
  out_total: number;
};

export interface DashboardResponse {
  data: Dashboard;
}
