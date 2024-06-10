import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const registerSchema = Yup.object().shape({
  document: ValidationRules.Cpf(),
  name: ValidationRules.FullName(),
  role: ValidationRules.Required(),
  email: ValidationRules.Email(),
});
