export type InventoryStatus = 'AVAILABLE' | 'RESERVED' | 'ALLOCATED' | 'CONSUMED' | 'RELEASED' | 'EXPIRED';
export type InventoryAllocationStatus = 'ACTIVE' | 'PARTIALLY_CONSUMED' | 'CONSUMED' | 'RELEASED';

export interface InventoryReservation {
  id: number;
  orderItemId: number;
  productId: number;
  sellerId: number;
  quantity: number;
  status: InventoryStatus;
  expiresAt: string;
}

export interface InventoryAllocation {
  id: number;
  reservationId: number;
  quantity: number;
  consumedQuantity: number;
  status: InventoryAllocationStatus;
}

export interface InventoryMovement {
  id: number;
  reservationId: number;
  allocationId?: number;
  operation: string;
  fromStatus?: string;
  toStatus: string;
  quantity: number;
  createdAt: string;
}

export interface InventoryOrder {
  orderId: string;
  reservations: InventoryReservation[];
  allocations: InventoryAllocation[];
  movements: InventoryMovement[];
}
