











import {User} from "./user.entity";









export interface Product {
    id: number;
    name: string;
    description: string;
    unitPrice: number;
    stockQuantity: number;
    user: User;
    version: number;
    createdAt: string;
    modifiedAt: string;
}
