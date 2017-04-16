import AddressFormat from './AddressFormat';
import UserFormat from './UserFormat';
import ListFormat from './ListFormat';

export default class ExpatriationFormat {
    owner: UserFormat;
    location: AddressFormat;
    date: Date;
    lists:Array<ListFormat>;
    dayDiff?:number;
    completedAt?: number;
    createdAt: Date;
    updatedAt: Date;
}
