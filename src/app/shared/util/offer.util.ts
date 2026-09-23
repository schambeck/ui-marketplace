import {Offer} from '../model/offer.entity';

/** UI-only derivation; the API remains authoritative for cart and checkout validation. */
export function canPurchaseOffer(offer: Offer): boolean {
  return offer.status === 'PUBLISHED'
    && offer.availabilityStatus === 'AVAILABLE'
    && offer.context?.status !== 'INACTIVE'
    && offer.context?.status !== 'DISCONTINUED';
}

export function offerAvailabilitySeverity(offer: Offer): 'success' | 'danger' {
  return offer.availabilityStatus === 'AVAILABLE' ? 'success' : 'danger';
}

export function offerErrorMessage(error: {message?: string; status?: number}): string {
  if (error.status === 400 || error.status === 409) {
    return 'The offer changed or is no longer available. Refresh the offer and select it again.';
  }
  return error.message || 'The offer could not be processed.';
}
