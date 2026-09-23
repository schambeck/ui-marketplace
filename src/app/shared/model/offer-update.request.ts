import {OfferAvailabilityStatus} from './offer.entity';

export interface OfferUpdateRequest {
  productId: number;
  gameContextId: number;
  price: number;
  deliveryMethod: string;
  availabilitySource: string;
  availabilityStatus: OfferAvailabilityStatus;
  reason: string;
  source: string;
}
