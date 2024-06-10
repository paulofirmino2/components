export type GenericError = {
  code: string;
  fields?: { [field: string]: string };
  message: string;
  type: string;
};

export enum GenericErrorType {
  NoResponseException = 'NoResponseException',
  Request404 = 'Request failed with status code 404',
  Request401 = 'Request failed with status code 401',
}

export enum ErrorType {
  UserCredentialAlready = 'This credential already exists',
}

export enum LoginErrorType {
  NotAuthorizedException = 'invalid username or password',
}

export interface EmployeeError {
  company_user: {
    extra_data: string[];
  };
}
