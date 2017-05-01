import {User} from './user.interface';

export interface Review {
    user: User;
    review: string;
    rate: number;
    date: Date;
}
