/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import { findIndex, forEach } from 'lodash';

import {
  Button,
  Input,
  Loading,
  Select,
  Switch,
  Toast,
  Typography,
} from '@/components';
import { Card } from '@/components/Card';
import {
  BlockWrapper,
  Column,
  Footer,
  ImageTools,
  LoadingWrapper,
  PeriodSchedules,
  Wrapper,
} from '@/components/Form';
import { ImageFile } from '@/components/Form/types';
import { ToastVariants } from '@/components/Toast/Toast.types';
import { myCompanies } from '@/flux/modules/company/actions';
import {
  clearCreateEmployee,
  clearEditEmployee,
  clearGetEmployeeById,
  createEmployee,
  editEmployee,
  editEmployeePhoto,
  getEmployeeById,
} from '@/flux/modules/employee/actions';
import { EmployeeEditRequest, PeriodDays } from '@/flux/modules/employee/types';
import { useFillEmployee } from '@/hook/employee/employeeHooks';
import { useMyCompanies } from '@/hook/selectors/companyHooks';
import {
  useCreateEmployee,
  useEditEmployee,
  useGetEmployeeById,
} from '@/hook/selectors/employeeHooks';
import { useUser } from '@/hook/selectors/userHooks';
import { useAppDispatch } from '@/hook/store';
import { ErrorType } from '@/models/errors';
import {
  RoleAdminOptions,
  RoleCommonOptions,
  RoleCoordinatorOptions,
} from '@/models/guest';
import { RequestStatus } from '@/models/iRequest';
import { Schedules } from '@/types/Employee';
import { Role } from '@/types/Guest';
import { emptyMask } from '@/utils/functions';
import { registerSchema } from '@/utils/schemas';

type OptionType = { value: string; label: string };

const RoleOptionByUserRole = {
  [Role.ADMINISTRATOR]: RoleAdminOptions,
  [Role.COORDINATOR]: RoleCoordinatorOptions,
  [Role.COMMON]: RoleCommonOptions,
  [Role.GUEST]: RoleCommonOptions,
};

export const EmployeeFormPresentation = () => {
  const navigate = useNavigate();
  const { id: employeeId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { fillAccessPeriod, emptySchedules } = useFillEmployee();
  const { status: statusCreateEmployee, message: statusCreateMessage } =
    useCreateEmployee();
  const { data: dataGetEmployeeById, status: statusGetEmployeeById } =
    useGetEmployeeById();
  const { status: statusEditEmployee, data: dataEditEmployee } =
    useEditEmployee();
  const { data: dataMyCompanies } = useMyCompanies();
  const { data: userData } = useUser();

  const [imageFormatted, setImageFormatted] = useState<string>('');
  const [fileType, setFileType] = useState<File | null>(null);
  const [schedules, setSchedules] = useState<Schedules[]>(emptySchedules);
  const [checkedSwitch, setCheckedSwitch] = useState<boolean>(false);
  const [toastVariant, setToastVariant] = useState<ToastVariants>('success');
  const [options, setOptions] = useState<OptionType[]>([]);

  const isLoading = statusCreateEmployee === RequestStatus.fetching;

  useEffect(() => {
    if (dataMyCompanies?.length && userData) {
      const newOptions = dataMyCompanies.map(item => ({
        value: item.id as string,
        label: item.name,
      }));
      setOptions(newOptions);
      if (!userData?.is_superuser) {
        formik.setFieldValue('company', userData.extra_data.company);
      }
    }
  }, [dataMyCompanies, userData]);

  useEffect(() => {
    if (employeeId) {
      dispatch(getEmployeeById.request(employeeId));
    }
  }, [employeeId]);

  useEffect(() => {
    dispatch(myCompanies.request());
    return () => {
      dispatch(clearGetEmployeeById());
    };
  }, []);

  useEffect(() => {
    if (
      employeeId &&
      statusGetEmployeeById === RequestStatus.success &&
      dataGetEmployeeById
    ) {
      formik.setFieldValue('name', dataGetEmployeeById.user.extra_data.name);
      formik.setFieldValue('document', dataGetEmployeeById.user.username);
      formik.setFieldValue(
        'credential',
        dataGetEmployeeById.user.extra_data.credentials
      );
      formik.setFieldValue('company', dataGetEmployeeById.company.id);
      formik.setFieldValue(
        'registration',
        dataGetEmployeeById.user.extra_data.registration
      );
      formik.setFieldValue('imageSrc', dataGetEmployeeById.user.photo);
      formik.setFieldValue('role', dataGetEmployeeById.role);
      formik.setFieldValue('email', dataGetEmployeeById.user.email);

      formik.setFieldTouched('name', false);
      formik.setFieldTouched('document', false);
      formik.setFieldTouched('credential', false);
      formik.setFieldTouched('registration', false);
      formik.setFieldTouched('company', false);
      formik.setFieldTouched('imageSrc', false);
      formik.setFieldTouched('role', false);
      formik.setFieldTouched('email', false);
      const newSchedules = [...schedules];

      forEach(
        dataGetEmployeeById.access_period,
        (accessPeriod: { end: string; start: string }, key: string) => {
          const idx = findIndex(
            newSchedules,
            schedule => schedule.id === (key as PeriodDays)
          );
          if (idx !== -1) {
            newSchedules[idx].end = accessPeriod.end;
            newSchedules[idx].start = accessPeriod.start;
            newSchedules[idx].checked = !(
              accessPeriod.end === '00:00' && accessPeriod.start === '00:00'
            );
          }
        }
      );

      setSchedules(newSchedules);
      setImageFormatted(dataGetEmployeeById.user.photo);
      setCheckedSwitch(dataGetEmployeeById.blocked);
    }
  }, [employeeId, statusGetEmployeeById, dataGetEmployeeById]);

  useEffect(() => {
    if (statusEditEmployee === RequestStatus.success) {
      if (fileType && employeeId) {
        dispatch(
          editEmployeePhoto.request({
            id: dataGetEmployeeById?.user.id || '',
            photo: fileType,
            companyId: formik.values.company || '',
          })
        );
      }

      setToastVariant('success');
      toast('A alteração dos dados foi efetuada com sucesso!', {
        id: 'success',
      });
      dispatch(clearEditEmployee());
    }
  }, [statusEditEmployee, dataEditEmployee]);

  useEffect(() => {
    if (statusCreateEmployee === RequestStatus.error) {
      setToastVariant('error');
      if (statusCreateMessage === ErrorType.UserCredentialAlready) {
        formik.setFieldError('credential', 'Este cartão de acesso já existe');
      } else {
        toast('Falha ao tentar criar usuário!', { id: 'error' });
      }
    }

    if (statusCreateEmployee === RequestStatus.success) {
      setToastVariant('success');
      toast('Usuário adicionado com sucesso!', { id: 'success' });
      dispatch(clearCreateEmployee());
      setTimeout(() => {
        navigate('/usuarios');
      }, 2000);
    }
  }, [statusCreateEmployee]);

  const handleChangeFile = (fileUpload: ImageFile | null) => {
    if (!fileUpload) {
      setImageFormatted('');
      return;
    }
    const { srcEncoded, file } = fileUpload;
    setImageFormatted(srcEncoded);
    formik.setFieldValue('imageSrc', srcEncoded);
    setFileType(file);
  };

  const handleSubmit = () => {
    if (!employeeId) {
      dispatch(
        createEmployee.request({
          data: {
            name: formik.values.name,
            username: emptyMask(formik.values.document),
            credentials: formik.values.credential,
            registration: formik.values.registration,
            company: formik.values.company,
            photo: fileType as File,
            access_period: fillAccessPeriod(schedules),
            role: formik.values.role,
            email: formik.values.email,
            password: formik.values.password,
          },
          companyId: userData?.extra_data.company,
        })
      );
    } else {
      const payload: EmployeeEditRequest = {
        data: {
          extra_data: {
            name: formik.values.name,
            registration: formik.values.registration,
            company: formik.values.company,
          },
          blocked: checkedSwitch,
          role: formik.values.role,
          email: formik.values.email,
          access_period: fillAccessPeriod(schedules),
          company: formik.values.company,
        },
        id: employeeId || '',
      };

      if (!dataGetEmployeeById?.user.extra_data.credentials) {
        payload.data.extra_data.credentials = formik.values.credential;
      }

      dispatch(editEmployee.request(payload));
    }
  };

  const handleBack = () => {
    navigate('/usuarios');
  };

  const formik = useFormik({
    initialValues: {
      imageSrc: '',
      document: '',
      credential: '',
      name: '',
      registration: '',
      company: '',
      role: '',
      email: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => registerSchema,
  });

  return (
    <>
      <Typography variant="title" spacing="lg">
        {`${employeeId ? 'Editar' : 'Cadastrar'} Usuário`}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <Typography variant="subTitle" spacing="md">
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
                label="Empresa"
                disabled={!userData?.is_superuser}
                id="company"
                spacing="lg"
                value={formik.values.company}
                onChangeOption={(value: string) => {
                  if (value) {
                    formik.setFieldValue('company', value);
                  }
                }}
                errorMessage={
                  (formik.touched.company && formik.errors.company) || ''
                }
                placeholder="Selecione..."
                options={options}
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
                    formik.setFieldValue('password', '');
                  }
                }}
                errorMessage={(formik.touched.role && formik.errors.role) || ''}
                placeholder="Selecione..."
                options={RoleOptionByUserRole[userData?.role || Role.COMMON]}
              />
              {!employeeId &&
                (formik.values.role === Role.ADMINISTRATOR ||
                  formik.values.role === Role.COORDINATOR) && (
                  <Input
                    label="Senha"
                    type="password"
                    value={formik.values.password}
                    spacing="lg"
                    errorMessage={
                      (formik.touched.password && formik.errors.password) || ''
                    }
                    id="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                )}
              <ImageTools
                image={imageFormatted}
                errorMessage={
                  (formik.touched.imageSrc && formik.errors.imageSrc) || ''
                }
                onChangeFile={handleChangeFile}
              />
            </Column>
            <Column>
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
                label="Cartão de acesso"
                mask="rne"
                disabled={
                  !!employeeId &&
                  !!dataGetEmployeeById?.user.extra_data.credentials
                }
                value={formik.values.credential}
                spacing="lg"
                errorMessage={
                  (formik.touched.credential && formik.errors.credential) || ''
                }
                id="credential"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <Input
                label="Matrícula"
                value={formik.values.registration}
                spacing="lg"
                errorMessage={
                  (formik.touched.registration && formik.errors.registration) ||
                  ''
                }
                id="registration"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <PeriodSchedules
                title="Período"
                schedules={schedules}
                onChangeSchedules={setSchedules}
              />
              <BlockWrapper>
                <Typography variant="subTitle" spacing="md">
                  Bloquear Usuário
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      sx={{ m: 1 }}
                      checked={checkedSwitch}
                      onChange={() => setCheckedSwitch(!checkedSwitch)}
                    />
                  }
                  label={checkedSwitch ? 'Sim' : 'Não'}
                />
              </BlockWrapper>
            </Column>
          </Wrapper>
          {isLoading && (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          )}
          <Footer>
            <Button disabled={isLoading} type="submit">
              Salvar cadastro
            </Button>
            <Button
              disabled={isLoading}
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
      <Toast variant={toastVariant} id={toastVariant} />
    </>
  );
};
