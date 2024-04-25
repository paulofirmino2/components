import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const companySchema = Yup.object().shape({
  cnpj: ValidationRules.CNPJ(),
  email: ValidationRules.Email(),
  fantasyName: ValidationRules.Required(),
  company: ValidationRules.Required(),
});
