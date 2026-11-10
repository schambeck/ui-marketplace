import {Offer} from '../model/offer.entity';
import {canPurchaseOffer, offerErrorMessage} from './offer.util';

describe('offer utilities', () => {
  const baseOffer = {
    status: 'PUBLISHED',
    availabilityStatus: 'AVAILABLE',
    context: {id: 1, game: 'Game', platform: 'PC', status: 'ACTIVE'}
  } as Offer;

  it('allows only published and available offers with an active context', () => {
    expect(canPurchaseOffer(baseOffer)).toBeTrue();
    expect(canPurchaseOffer({...baseOffer, status: 'PAUSED'} as Offer)).toBeFalse();
    expect(canPurchaseOffer({...baseOffer, availabilityStatus: 'UNAVAILABLE'} as Offer)).toBeFalse();
    expect(canPurchaseOffer({...baseOffer, context: {...baseOffer.context, status: 'INACTIVE'}} as Offer)).toBeFalse();
  });

  it('returns an actionable message for domain revalidation errors', () => {
    expect(offerErrorMessage({status: 400})).toContain('Atualize');
    expect(offerErrorMessage({status: 409})).toContain('selecione novamente');
    expect(offerErrorMessage({message: 'network failure'})).toBe('network failure');
  });
});
