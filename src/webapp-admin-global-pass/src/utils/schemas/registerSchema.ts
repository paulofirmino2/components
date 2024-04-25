import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const registerSchema = Yup.object().shape({
  document: ValidationRules.Cpf(),
  name: ValidationRules.FullName(),
  imageSrc: ValidationRules.FileRequired(),
  role: ValidationRules.Required(),
  company: ValidationRules.Required(),
  email: ValidationRules.Email(),
});
