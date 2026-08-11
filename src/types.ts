export type Rarity = 'SSR' | 'SR' | 'R';
export type UserType = 'pond' | 'aoey';

export interface Card {
  id: string;
  rarity: Rarity;
  title: string;
  message: string;
  iconName: string;
  themeColor: string;
  textColor: string;
  bgGradient: string;
}

export interface Task {
  id: string;
  title: string;
  points: number;
  iconName: string;
  color: string;
  period: 'daily' | 'weekly';
  maxLimit: number;
}

export interface DeductionInfo {
  id: string;
  reason: string;
  amount: number;
  timestamp: number;
  deductedBy: UserType;
  target: UserType;
}

export interface TaskRecord {
  taskId: string;
  timestamp: number;
}

export interface GameState {
  points: Record<UserType, number>;
  inventory: Record<UserType, Card[]>;
  pulledIds: Record<UserType, string[]>;
  redeemedCount: Record<UserType, number>;
  deductions: DeductionInfo[];
  taskHistory: Record<UserType, TaskRecord[]>;
}
