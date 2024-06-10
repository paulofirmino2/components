export type Mask = {
  mask: string;
  maskPlaceholder: string;
};

export type Masks = {
  text: Mask;
  cel: Mask;
  tel: Mask;
  cep: Mask;
  cpf: Mask;
  cnpj: Mask;
  rg: Mask;
  rne: Mask;
  data: Mask;
  currency: Mask;
  cnh: Mask;
  hour: Mask;
};

export type MaskItens =
  | 'text'
  | 'cel'
  | 'tel'
  | 'cep'
  | 'cpf'
  | 'cnpj'
  | 'rg'
  | 'rne'
  | 'data'
  | 'currency'
  | 'cnh'
  | 'hour';
