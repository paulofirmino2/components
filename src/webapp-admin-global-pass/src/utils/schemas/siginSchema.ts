import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const siginSchema = Yup.object().shape({
  cpf: ValidationRules.Cpf(),
  password: ValidationRules.Required(),
});
