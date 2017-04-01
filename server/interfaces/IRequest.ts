import { Request } from 'express';
import UserFormat from '../formats/UserFormat';

interface IRequest extends Request {
  authenticatedUser: UserFormat
}

export default IRequest;
