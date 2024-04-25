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
  LoadingWrapper,
  PeriodSchedules,
  Wrapper,
} from '@/components/Form';
import { ToastVariants } from '@/components/Toast/Toast.types';
import {
  clearCreateCompany,
  clearEditCompany,
  clearGetCompanyById,
  createCompany,
  editCompany,
  getCompanyById,
  myCompanies,
} from '@/flux/modules/company/actions';
import { PeriodDays } from '@/flux/modules/employee/types';
import { useFillEmployee } from '@/hook/employee/employeeHooks';
import {
  useCreateCompany,
  useEditCompany,
  useGetCompanyById,
  useMyCompanies,
} from '@/hook/selectors/companyHooks';
import { useUser } from '@/hook/selectors/userHooks';
import { useAppDispatch } from '@/hook/store';
import { RequestStatus } from '@/models/iRequest';
import { Schedules } from '@/types/Employee';
import { emptyMask } from '@/utils/functions';
import { companySchema } from '@/utils/schemas';

type OptionType = { value: string; label: string };

export const CompanyFormPresentation = () => {
  const navigate = useNavigate();
  const { id: companyId } = useParams<{ id: string }>();
  const { data: userData } = useUser();

  const dispatch = useAppDispatch();
  const { fillAccessPeriod, emptySchedules } = useFillEmployee();
  const { status: statusCreateCompany } = useCreateCompany();
  const { data: dataGetCompanyById, status: statusGetCompanyById } =
    useGetCompanyById();
  const { status: statusEditCompany, data: dataEditCompany } = useEditCompany();
  const { data: dataMyCompanies } = useMyCompanies();

  const [schedules, setSchedules] = useState<Schedules[]>(emptySchedules);
  const [checkedSwitch, setCheckedSwitch] = useState<boolean>(false);
  const [toastVariant, setToastVariant] = useState<ToastVariants>('success');
  const [options, setOptions] = useState<OptionType[]>([]);

  const isLoading = statusCreateCompany === RequestStatus.fetching;

  useEffect(() => {
    if (companyId) {
      dispatch(getCompanyById.request(companyId));
    }
  }, [companyId]);

  useEffect(() => {
    if (dataMyCompanies?.length && userData) {
      const newOptions = dataMyCompanies.map(item => ({
        value: item.id as string,
        label: item.name,
      }));
      setOptions(newOptions);
      formik.setFieldValue('company', userData.extra_data.company);
    }
  }, [dataMyCompanies, userData]);

  useEffect(() => {
    dispatch(myCompanies.request());
    return () => {
      dispatch(clearGetCompanyById());
    };
  }, []);

  useEffect(() => {
    if (
      companyId &&
      statusGetCompanyById === RequestStatus.success &&
      dataGetCompanyById
    ) {
      formik.setFieldValue('fantasyName', dataGetCompanyById.fantasy_name);
      formik.setFieldValue('cnpj', dataGetCompanyById.cnpj);
      formik.setFieldValue('email', dataGetCompanyById.company_email);
      formik.setFieldValue('company', dataGetCompanyById.responsible);

      formik.setFieldTouched('fantasyName', false);
      formik.setFieldTouched('cnpj', false);
      formik.setFieldTouched('email', false);
      formik.setFieldTouched('company', false);
      const newSchedules = [...schedules];

      forEach(
        dataGetCompanyById.worker_period,
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
      setCheckedSwitch(dataGetCompanyById.blocked || false);
    }
  }, [companyId, statusGetCompanyById, dataGetCompanyById]);

  useEffect(() => {
    if (statusEditCompany === RequestStatus.success) {
      setToastVariant('success');
      toast('A alteração dos dados foi efetuada com sucesso!', {
        id: 'success',
      });
      dispatch(clearEditCompany());
    }
  }, [statusEditCompany, dataEditCompany]);

  useEffect(() => {
    if (statusCreateCompany === RequestStatus.error) {
      setToastVariant('error');
      toast('Falha ao tentar criar empresa!', { id: 'error' });
    }

    if (statusCreateCompany === RequestStatus.success) {
      setToastVariant('success');
      toast('Empresa adicionada com sucesso!', { id: 'success' });
      dispatch(clearCreateCompany());
      setTimeout(() => {
        navigate('/empresa');
      }, 2000);
    }
  }, [statusCreateCompany]);

  const handleSubmit = () => {
    if (!companyId) {
      dispatch(
        createCompany.request({
          name: formik.values.fantasyName,
          fantasy_name: formik.values.fantasyName,
          cnpj: emptyMask(formik.values.cnpj),
          company_email: formik.values.email,
          responsible: formik.values.company,
          worker_period: fillAccessPeriod(schedules),
        })
      );
    }
    dispatch(
      editCompany.request({
        data: {
          fantasy_name: formik.values.fantasyName,
          company_email: formik.values.email,
          responsible: formik.values.company,
          blocked: checkedSwitch,
          worker_period: fillAccessPeriod(schedules),
        },
        id: companyId || '',
      })
    );
  };

  const handleBack = () => {
    navigate('/empresa');
  };

  const formik = useFormik({
    initialValues: {
      cnpj: '',
      fantasyName: '',
      email: '',
      company: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => companySchema,
  });

  return (
    <>
      <Typography variant="title" spacing="lg">
        {`${companyId ? 'Editar' : 'Cadastrar nova'} Empresa`}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <Wrapper>
            <Column>
              <Typography variant="subTitle" spacing="md">
                Dados da Empresa
              </Typography>
              <Input
                label="Nome fantasia"
                value={formik.values.fantasyName}
                spacing="lg"
                errorMessage={
                  (formik.touched.fantasyName && formik.errors.fantasyName) ||
                  ''
                }
                id="fantasyName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                label="CNPJ"
                value={formik.values.cnpj}
                spacing="lg"
                mask="cnpj"
                disabled={!!companyId}
                errorMessage={(formik.touched.cnpj && formik.errors.cnpj) || ''}
                id="cnpj"
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
                label="Empresa Responsável"
                id="company"
                spacing="lg"
                disabled
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
            </Column>
            <Column>
              <PeriodSchedules
                title="Período de Funcionamento"
                schedules={schedules}
                onChangeSchedules={setSchedules}
              />
              {!!companyId && (
                <BlockWrapper>
                  <Typography variant="subTitle" spacing="md">
                    Bloquear Empresa
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
              )}
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
