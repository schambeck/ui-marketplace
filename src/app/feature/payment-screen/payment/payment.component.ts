import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {PaymentService} from "../../../shared/service/payment.service";
import {Payment} from "../../../shared/model/payment.entity";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  saving = false;
  cartSubject$ = new BehaviorSubject<Payment>({} as Payment);
  payment$?: Observable<Payment>;

  constructor(private router: Router,
              private titleService: Title,
              private route: ActivatedRoute,
              private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.titleService.setTitle("Payment");
    this.savePayment(this.createPayment());
  }

  createPayment() {
    return {
      paymentId: Number(this.route.snapshot.queryParamMap.get('payment_id')),
      status: this.route.snapshot.queryParamMap.get('status'),
      merchantOrderId: Number(this.route.snapshot.queryParamMap.get('merchant_order_id')),
      externalReference: this.route.snapshot.queryParamMap.get('external_reference'),
      detail: {
        collectionId: Number(this.route.snapshot.queryParamMap.get('collection_id')),
        collectionStatus: this.route.snapshot.queryParamMap.get('collection_status'),
        paymentType: this.route.snapshot.queryParamMap.get('payment_type'),
        preferenceId: this.route.snapshot.queryParamMap.get('preference_id'),
        siteId: this.route.snapshot.queryParamMap.get('site_id'),
        processingMode: this.route.snapshot.queryParamMap.get('processing_mode'),
        merchantAccountId: this.route.snapshot.queryParamMap.get('merchant_account_id')
      }
    } as Payment
  }

  savePayment(payment: Payment) {
    this.saving = true;
    this.paymentService.create(payment).subscribe({
      next: cart => {
        this.cartSubject$.next(cart);
        this.payment$ = this.cartSubject$.asObservable();
      },
      error: () => this.saving = false,
      complete: () => this.saving = false
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  back(): void {
    this.router.navigate(['catalog']);
  }
}
