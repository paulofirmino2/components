import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import { Button, Input, Select, Typography } from '@/components';
import { Card } from '@/components/Card';
import { Column, Footer, Wrapper } from '@/components/Form';
import {
  RoleAdminOptions,
  RoleCommonOptions,
  RoleCoordinatorOptions,
} from '@/models/guest';
import { Role } from '@/types/Guest';
import { registerSchema } from '@/utils/schemas';

import * as Styled from './EmployeeForm.styled';

const RoleOptionByUserRole = {
  [Role.ADMINISTRATOR]: RoleAdminOptions,
  [Role.COORDINATOR]: RoleCoordinatorOptions,
  [Role.COMMON]: RoleCommonOptions,
  [Role.GUEST]: RoleCommonOptions,
};

export const EmployeeFormPresentation = () => {
  const navigate = useNavigate();
  const { id: employeeId } = useParams<{ id: string }>();

  const handleSubmit = () => {};

  const handleBack = () => {
    navigate('/usuarios');
  };

  const formik = useFormik({
    initialValues: {
      document: '',
      name: '',
      email: '',
      role: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => registerSchema,
  });

  return (
    <Styled.Wrapper>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <Typography variant="title" spacing="md">
            Dados Pessoais
          </Typography>
          <Wrapper>
            <Column>
              <Input
                label="Nome"
                value={formik.values.name}
                spacing="lg"
                errorMessage={(formik.touched.name && formik.errors.name) || ''}
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                label="Cpf"
                value={formik.values.document}
                spacing="lg"
                mask="cpf"
                disabled={!!employeeId}
                errorMessage={
                  (formik.touched.document && formik.errors.document) || ''
                }
                id="document"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                label="Email"
                value={formik.values.email}
                spacing="lg"
                errorMessage={
                  (formik.touched.email && formik.errors.email) || ''
                }
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <Select
                label="Papel"
                id="role"
                spacing="lg"
                disabled={!!employeeId}
                value={formik.values.role}
                onChangeOption={(value: string) => {
                  if (value) {
                    formik.setFieldValue('role', value);
                  }
                }}
                errorMessage={(formik.touched.role && formik.errors.role) || ''}
                placeholder="Selecione..."
                options={RoleOptionByUserRole.ADMINISTRATOR}
              />
            </Column>
          </Wrapper>

          <Footer>
            <Button type="submit">Salvar cadastro</Button>
            <Button
              id="cancel"
              type="button"
              onClick={handleBack}
              variant="secondary"
            >
              Voltar para a listagem
            </Button>
          </Footer>
        </Card>
      </form>
    </Styled.Wrapper>
  );
};
