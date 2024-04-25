import * as Yup from 'yup';

import ValidationRules from '../validations/validationsSchemas';

export const guestSchema = Yup.object().shape({
  document: ValidationRules.Cpf(),
  name: ValidationRules.FullName(),
  email: ValidationRules.Email(),
  company: ValidationRules.Required(),
  locale: ValidationRules.Required(),
  accessPeriodEnd: ValidationRules.DateNotPast(),
  accessPeriodStart: ValidationRules.DateNotPast(),
});
