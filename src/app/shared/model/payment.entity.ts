import {PaymentDetail} from "./payment-detail.entity";

export interface Payment {
  paymentId: number;
  status: string;
  externalReference: string;
  merchantOrderId: number;
  detail: PaymentDetail;
}
