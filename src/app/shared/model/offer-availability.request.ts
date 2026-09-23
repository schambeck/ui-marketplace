import {OfferAvailabilityStatus} from './offer.entity';
import {OfferActionRequest} from './offer-action.request';

export interface OfferAvailabilityRequest extends OfferActionRequest {
  availabilityStatus: OfferAvailabilityStatus;
}
