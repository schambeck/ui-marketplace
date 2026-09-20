import {GameContextStatus} from './game-context-status';

export interface GameContext {
  id: number;
  version: number;
  game: string;
  platform: string;
  publisher?: string;
  region?: string;
  server?: string;
  variant?: string;
  status: GameContextStatus;
  createdAt: string;
  modifiedAt: string;
}
