



import {Product} from "./product.entity";
import {Cart} from "./cart.entity";















export interface CartItem {
    id: number;
    cart: Cart;
    product: Product;
    price: number;
    quantity: number;
    total: number;
    version: number;
    createdAt: string;
    modifiedAt: string;
}
