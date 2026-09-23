import {GameContextReference} from './game-context-reference.entity';
import {Product} from './product.entity';

export type OfferStatus = 'DRAFT' | 'PUBLISHED' | 'PAUSED' | 'RETIRED';
export type OfferAvailabilityStatus = 'AVAILABLE' | 'UNAVAILABLE';

export interface Offer {
  id: number;
  productId: number;
  gameContextId: number;
  contextVersion: number;
  context: GameContextReference;
  price: number;
  deliveryMethod: string;
  availabilitySource: string;
  availabilityStatus: OfferAvailabilityStatus;
  status: OfferStatus;
  version: number;
  createdAt: string;
  modifiedAt: string;
  product?: Product;
}
