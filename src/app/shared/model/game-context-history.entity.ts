import {GameContextStatus} from './game-context-status';

export interface GameContextHistory {
  id: number;
  gameContextId: number;
  action: string;
  game: string;
  platform: string;
  publisher?: string;
  region?: string;
  server?: string;
  variant?: string;
  status: GameContextStatus;
  changedBy?: string;
  recordedAt: string;
}
