import {Product} from "./product.entity";

export interface Image {
    id?: number;
    product: Product;
    objectId: string;
    fileName: string;
    contentType: string;
    size: number;
    version: number;
    createdAt?: string;
    modifiedAt?: string;
}
