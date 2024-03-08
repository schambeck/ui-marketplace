export interface CreateShoppingCartItemRequest {
    cartId?: number;
    productId: number;
    quantity: number;
}
