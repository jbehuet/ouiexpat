
export interface User {
    _id?: String;
    firstname: String;
    lastname: String;
    password?: String;
    email: String;
    photo: String;
    address?: any;
    administrator?: boolean;
    phone?: any;
    birthday?: Date;
    expeditions?: Array<any>;
}
