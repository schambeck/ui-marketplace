import {GameContextStatus} from './game-context-status';

export interface GameContextReference {
  id: number;
  version?: number;
  game: string;
  platform: string;
  publisher?: string;
  region?: string;
  server?: string;
  variant?: string;
  status?: GameContextStatus;
}
