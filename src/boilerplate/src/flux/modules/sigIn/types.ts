export type SigInRequest = {
  username: string;
  password: string;
};

export type SigIn = {
  refresh: string;
  access: string;
};

export interface SigInResponse {
  data: SigIn;
}
