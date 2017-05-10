import PhoneFormat from './PhoneFormat';
import ReviewFormat from './ReviewFormat';
import AddressFormat from './AddressFormat';

export default class JobFormat {
  title: string;
  company: string;
  email: string;
  address: AddressFormat;
  image: string;
  link: string;
  phone: PhoneFormat;
  contract: string;
  details: string;
  createdAt: Date;
  updatedAt: Date;
    save():any {};
}
