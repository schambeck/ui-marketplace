import {CartItem} from "./cart-item.entity";

export interface CreateIfAbsentShoppingCartItemResponse {
    created: boolean;
    cartItem: CartItem;
}
