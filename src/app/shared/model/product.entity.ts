











import {User} from "./user.entity";









export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    user: User;
    category: string;
    inventoryStatus: string;
    rating: number;
    image: string;
    objectId: string;
    version: number;
    createdAt: string;
    modifiedAt: string;
}
