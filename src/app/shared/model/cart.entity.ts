



import {User} from "./user.entity";











export interface Cart {
    id: number;
    user: User;
    total: number;
    version: number;
    createdAt: string;
    modifiedAt: string;
}
