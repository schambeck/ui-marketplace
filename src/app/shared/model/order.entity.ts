import {OrderStatus} from './order-status';
export interface OrderItem {
  id: number; productId: number; offerId: number; sellerId: number;
  productName: string; productDescription?: string; contextGame: string;
  contextPlatform: string; contextRegion?: string; contextVariant?: string;
  deliveryMethod: string; unitPrice: number; quantity: number; subtotalAmount: number;
  snapshotVersion: number; snapshot: string;
}

export interface OrderHistoryEntry {
  fromStatus?: string; toStatus: string; cause: string; source: string;
  actor?: string; idempotencyKey?: string; createdAt: string;
}

export interface Order {
  publicId: string; status: OrderStatus; subtotalAmount: number; discountTotal?: number;
  taxTotal?: number; shippingTotal?: number; feeTotal?: number; totalAmount: number;
  buyerSnapshot?: string; instructions?: string; paymentReference?: string;
  inventoryReference?: string; fulfillmentReference?: string; deliveryReference?: string;
  items?: OrderItem[]; history?: OrderHistoryEntry[];
}
