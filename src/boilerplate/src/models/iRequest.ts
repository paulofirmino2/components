import { GenericError } from './errors';

export enum RequestStatus {
  idle = 'IDLE',
  fetching = 'FETCHING',
  success = 'SUCCESS',
  error = 'ERROR',
}

export interface IRequest<Interface> {
  data: Interface | null;
  error?: GenericError | null;
  message?: string | null;
  status: RequestStatus;
}

export interface IRequestPreFilled<Interface> {
  data: Interface;
  status: RequestStatus;
}

export type EmptyRequest = {
  error?: GenericError | null;
  status: RequestStatus;
};

export type RequestErrorMessage = {
  message: string;
  type: 'success' | 'error' | 'alert' | string;
};
