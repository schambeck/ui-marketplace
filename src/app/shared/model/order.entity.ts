import {OrderStatus} from './order-status';
export interface Order { publicId: string; status: OrderStatus; subtotalAmount: number; totalAmount: number; }
