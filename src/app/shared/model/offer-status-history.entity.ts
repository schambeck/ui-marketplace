import {OfferStatus} from './offer.entity';

export interface OfferStatusHistory {
  id: number;
  offerId: number;
  fromStatus?: OfferStatus;
  toStatus: OfferStatus;
  reason: string;
  source: string;
  changedBy: string;
  recordedAt: string;
}
