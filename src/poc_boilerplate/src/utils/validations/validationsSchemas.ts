import * as Yup from 'yup';

import { validCNPJ } from './cnpj';
import { validCpf } from './cpf';
import { isDate, isPastDate, isTodayOrFutureDate } from './date';
import fullNameRegex from './fullNameRegex';

export default {
  Required() {
    return Yup.string().required('Campo obrigatório.');
  },
  FileRequired() {
    return Yup.string().required('Adicione um arquivo.');
  },
  Email() {
    return Yup.string()
      .email('E-mail incorreto.')
      .required('Campo obrigatório.');
  },
  EmailNotRequired() {
    return Yup.string().email('E-mail incorreto.');
  },
  Cpf() {
    return Yup.string()
      .required('Você precisa informar o seu CPF.')
      .test('cpf', 'CPF inválido.', (value: string) => {
        if (value) {
          return validCpf(value);
        }
        return true;
      });
  },
  CNPJ() {
    return Yup.string()
      .required('Você precisa informar o seu CNPJ.')
      .test('cpf', 'CNPJ inválido.', (value: string) => {
        if (value) {
          return validCNPJ(value);
        }
        return true;
      });
  },
  BirthDate() {
    return Yup.string()
      .required('Campo obrigatório.')
      .test('validDate', 'Data inválida.', value => {
        if (value) {
          return isDate(value) && isPastDate(value);
        }
        return true;
      });
  },
  DateNotPast() {
    return Yup.string()
      .required('Campo obrigatório.')
      .test('validDate', 'Data inválida.', value => {
        if (value) {
          return isTodayOrFutureDate(value);
        }
        return true;
      });
  },
  Cep() {
    return Yup.string()
      .required('Campo obrigatório.')
      .test('validCep', 'Cep inválido.', value => {
        if (value) {
          const cepNoMask = value.replace('-', '');
          return cepNoMask.length === 8;
        }
        return false;
      });
  },
  FullName() {
    return Yup.string()
      .required('Campo obrigatório.')
      .matches(fullNameRegex, 'Digite o nome completo.');
  },
};
