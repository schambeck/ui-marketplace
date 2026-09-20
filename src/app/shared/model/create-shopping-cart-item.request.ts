export interface CreateShoppingCartItemRequest {
    cartId?: number;
    offerId?: number;
    productId?: number;
    quantity: number;
}
