export interface RouteStructure {
  path: string;
  label?: string;
  component: React.ReactNode;
  adminOnly?: boolean;
}
