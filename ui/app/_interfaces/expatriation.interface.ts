import { User } from './user.interface';

export interface Expatriation {
    _id: string;
    owner: User;
    location: any;
    date: Date;
    lists:Array<any>;
    dayDiff?:number;
    completedAt?: number;
    createdAt: Date;
    updatedAt: Date;
}
