export type DashboardProfile = 'guest' | 'admin' | 'seller' | 'buyer';
export type LoadState = 'loading' | 'success' | 'error';
export interface DashboardMetric {
  id: string;
  title: string;
  icon: string;
  detail: string;
  route: string;
  actionLabel?: string;
  state: LoadState;
  value?: number;
}
export interface DashboardActivity {
  id: string;
  title: string;
  status: string;
  date?: string;
  amount?: number;
  route: string[];
}
export interface DashboardSection {
  metrics: DashboardMetric[];
  activities?: DashboardActivity[];
  activityState?: LoadState;
}
export interface DashboardAction { title: string; description: string; icon: string; route: string; }
