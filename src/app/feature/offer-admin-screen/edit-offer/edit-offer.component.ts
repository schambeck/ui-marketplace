import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BehaviorSubject, Observable, finalize, shareReplay} from 'rxjs';
import {MessageService} from 'primeng/api';
import {Title} from '@angular/platform-browser';

import {Offer, OfferAvailabilityStatus, OfferStatus} from '../../../shared/model/offer.entity';
import {OfferStatusHistory} from '../../../shared/model/offer-status-history.entity';
import {OfferService} from '../../../shared/service/offer.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {
  offerSubject$ = new BehaviorSubject<Offer>({} as Offer);
  offer$ = this.offerSubject$.asObservable();
  history$?: Observable<OfferStatusHistory[]>;
  reason = '';
  source = 'ui';
  saving = false;
  loadingHistory = false;
  availabilityStatuses: OfferAvailabilityStatus[] = ['AVAILABLE', 'UNAVAILABLE'];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: OfferService,
              private messageService: MessageService,
              private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Offer');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getAdmin(id).subscribe(offer => {
        this.offerSubject$.next(offer);
        this.loadHistory(offer.id);
      });
    }
  }

  back(): void {
    this.location.back();
  }

  offer(): Offer {
    return this.offerSubject$.getValue();
  }

  contextLabel(offer: Offer): string {
    return offer.context ? offer.context.game + " · " + offer.context.platform : "";
  }

  isReasonValid(): boolean {
    return Boolean(this.reason.trim() && this.source.trim());
  }

  saveDraft(): void {
    const offer = this.offer();
    if (offer.status !== 'DRAFT' || !this.isReasonValid()) {
      this.warn('A DRAFT offer requires a reason and source before editing.');
      return;
    }
    this.saving = true;
    this.service.updateDraft(offer.id, {
      productId: offer.productId,
      gameContextId: offer.gameContextId,
      price: offer.price,
      deliveryMethod: offer.deliveryMethod,
      availabilitySource: offer.availabilitySource,
      availabilityStatus: offer.availabilityStatus,
      reason: this.reason,
      source: this.source
    }).pipe(finalize(() => this.saving = false)).subscribe(saved => {
      this.offerSubject$.next(saved);
      this.reason = '';
      this.messageService.add({severity: 'success', summary: 'Offer saved'});
      this.loadHistory(saved.id);
    });
  }

  changeAvailability(): void {
    const offer = this.offer();
    if (!this.isReasonValid()) {
      this.warn('A reason and source are required for availability changes.');
      return;
    }
    this.runAction(this.service.changeAvailability(offer.id, {
      availabilityStatus: offer.availabilityStatus,
      reason: this.reason,
      source: this.source
    }));
  }

  transition(target: 'publish' | 'pause' | 'reactivate' | 'retire'): void {
    const offer = this.offer();
    if (!this.isReasonValid()) {
      this.warn('A reason and source are required for status changes.');
      return;
    }
    const request = {reason: this.reason, source: this.source};
    const operation = target === 'publish' ? this.service.publish(offer.id, request)
      : target === 'pause' ? this.service.pause(offer.id, request)
        : target === 'reactivate' ? this.service.reactivate(offer.id, request)
          : this.service.retire(offer.id, request);
    this.runAction(operation);
  }

  canTransition(target: 'publish' | 'pause' | 'reactivate' | 'retire'): boolean {
    const status = this.offer().status;
    return target === 'publish' ? status === 'DRAFT' || status === 'PAUSED'
      : target === 'pause' ? status === 'PUBLISHED'
        : target === 'reactivate' ? status === 'PAUSED'
          : status !== 'RETIRED';
  }

  private runAction(operation: Observable<Offer>): void {
    this.saving = true;
    operation.pipe(finalize(() => this.saving = false)).subscribe(saved => {
      this.offerSubject$.next(saved);
      this.reason = '';
      this.messageService.add({severity: 'success', summary: 'Offer updated'});
      this.loadHistory(saved.id);
    });
  }

  private loadHistory(id: number): void {
    this.loadingHistory = true;
    this.history$ = this.service.history(id).pipe(finalize(() => this.loadingHistory = false), shareReplay(1));
  }

  private warn(detail: string): void {
    this.messageService.add({severity: 'warn', summary: 'Offer action unavailable', detail});
  }
}
