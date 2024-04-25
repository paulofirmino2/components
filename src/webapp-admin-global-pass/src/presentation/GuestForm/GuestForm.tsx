/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { findIndex, forEach } from 'lodash';
import moment from 'moment';

import {
  Button,
  DatePicker,
  Input,
  Loading,
  Select,
  Toast,
  Typography,
} from '@/components';
import { Card } from '@/components/Card';
import {
  Column,
  Footer,
  LoadingWrapper,
  PeriodSchedules,
  Wrapper,
} from '@/components/Form';
import { ToastVariants } from '@/components/Toast/Toast.types';
import { myCompanies } from '@/flux/modules/company/actions';
import { PeriodDays } from '@/flux/modules/employee/types';
import {
  clearCreateGuest,
  createGuest,
  getGuestById,
} from '@/flux/modules/guest/actions';
import { useFillEmployee } from '@/hook/employee/employeeHooks';
import { useMyCompanies } from '@/hook/selectors/companyHooks';
import { useCreateGuest, useGetGuestById } from '@/hook/selectors/guestHooks';
import { useUser } from '@/hook/selectors/userHooks';
import { useAppDispatch } from '@/hook/store';
import { RequestStatus } from '@/models/iRequest';
import { Schedules } from '@/types/Employee';
import { emptyMask } from '@/utils/functions';
import { guestSchema } from '@/utils/schemas';

import * as Styled from './GuestForm.styled';

type OptionType = { value: string; label: string };

export const GuestFormPresentation = () => {
  const navigate = useNavigate();
  const { id: guestId } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { fillAccessPeriod, emptySchedules } = useFillEmployee();
  const { status: statusCreateGuest } = useCreateGuest();
  const { data: dataMyCompanies } = useMyCompanies();
  const { data: userData } = useUser();
  const { data: dataGetGuestById, status: statusGetGuestById } =
    useGetGuestById();

  const [valueAccessPeriodStart, setValueAccessPeriodStart] =
    useState<Date | null>(null);
  const [valueAccessPeriodEnd, setValueAccessPeriodEnd] = useState<Date | null>(
    null
  );
  const [schedules, setSchedules] = useState<Schedules[]>(emptySchedules);
  const [toastVariant, setToastVariant] = useState<ToastVariants>('success');
  const [options, setOptions] = useState<OptionType[]>([]);
  const isLoading = statusCreateGuest === RequestStatus.fetching;

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
    dispatch(myCompanies.request());
  }, []);

  useEffect(() => {
    if (guestId) {
      dispatch(getGuestById.request(guestId));
    }
  }, [guestId]);

  useEffect(() => {
    if (
      guestId &&
      statusGetGuestById === RequestStatus.success &&
      dataGetGuestById
    ) {
      formik.setFieldValue('name', dataGetGuestById.data.name);
      formik.setFieldValue('locale', dataGetGuestById.data.locale);
      formik.setFieldValue('document', dataGetGuestById.username);
      formik.setFieldValue('company', dataGetGuestById.company);
      formik.setFieldValue('email', dataGetGuestById.email);
      formik.setFieldValue(
        'accessPeriodStart',
        dataGetGuestById.access_period_start
      );
      formik.setFieldValue(
        'accessPeriodEnd',
        dataGetGuestById.access_period_end
      );

      formik.setFieldTouched('name', false);
      formik.setFieldTouched('document', false);
      formik.setFieldTouched('company', false);
      formik.setFieldTouched('email', false);
      formik.setFieldTouched('accessPeriodStart', false);
      const newSchedules = [...schedules];

      forEach(
        dataGetGuestById.access_period,
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
      setValueAccessPeriodStart(new Date(dataGetGuestById.access_period_start));
      setValueAccessPeriodEnd(new Date(dataGetGuestById.access_period_end));
    }
  }, [guestId, statusGetGuestById, dataGetGuestById]);

  useEffect(() => {
    if (statusCreateGuest === RequestStatus.error) {
      setToastVariant('error');
      toast('Falha ao tentar criar convite!', { id: 'error' });
    }

    if (statusCreateGuest === RequestStatus.success) {
      setToastVariant('success');
      toast('Convite adicionado com sucesso!', { id: 'success' });
      dispatch(clearCreateGuest());
      setTimeout(() => {
        navigate('/convites');
      }, 2000);
    }
  }, [statusCreateGuest]);

  const isValidDateCompare = () => {
    if (
      moment(formik.values.accessPeriodStart).isAfter(
        moment(formik.values.accessPeriodEnd),
        'day'
      )
    ) {
      formik.setFieldError(
        'accessPeriodStart',
        'A data de Inicial deve ser anterior a Final'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (isValidDateCompare() && dataMyCompanies) {
      const idx = findIndex(dataMyCompanies, ['id', formik.values.company]);
      const companyName = dataMyCompanies[idx].fantasy_name;
      dispatch(
        createGuest.request({
          data: {
            name: formik.values.name,
            companyName,
            locale: formik.values.locale,
          },
          role: 'GUEST',
          access_period_start: formik.values.accessPeriodStart,
          access_period_end: formik.values.accessPeriodEnd,
          email: formik.values.email,
          company: formik.values.company,
          username: emptyMask(formik.values.document),
          access_period: fillAccessPeriod(schedules),
        })
      );
    }
  };

  const handleBack = () => {
    navigate('/convites');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      document: '',
      name: '',
      company: '',
      accessPeriodStart: '',
      accessPeriodEnd: '',
      locale: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => guestSchema,
  });

  return (
    <>
      <Typography variant="title" spacing="lg">
        {`${guestId ? 'Detalhe do ' : 'Cadastrar novo '} convite`}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <Wrapper>
            <Column>
              <Typography variant="subTitle" spacing="md">
                Dados Pessoais
              </Typography>
              <Input
                label="Nome"
                disabled={!!guestId}
                value={formik.values.name}
                spacing="lg"
                errorMessage={(formik.touched.name && formik.errors.name) || ''}
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                label="Cpf"
                disabled={!!guestId}
                value={formik.values.document}
                spacing="lg"
                mask="cpf"
                errorMessage={
                  (formik.touched.document && formik.errors.document) || ''
                }
                id="document"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                label="Email"
                disabled={!!guestId}
                value={formik.values.email}
                spacing="lg"
                errorMessage={
                  (formik.touched.email && formik.errors.email) || ''
                }
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                disabled={!!guestId}
                label="Endereço"
                value={formik.values.locale}
                spacing="lg"
                errorMessage={
                  (formik.touched.locale && formik.errors.locale) || ''
                }
                id="locale"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Select
                label="Empresa"
                id="company"
                disabled={!userData?.is_superuser || !!guestId}
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
            </Column>
            <Column>
              <PeriodSchedules
                title="Período"
                schedules={schedules}
                onChangeSchedules={setSchedules}
              >
                <Styled.DatePickerWrapper>
                  <DatePicker
                    disabled={!!guestId}
                    label="Data Inicial"
                    value={valueAccessPeriodStart}
                    onChangeValue={(value: Date | null) => {
                      setValueAccessPeriodStart(value);
                      formik.setFieldValue(
                        'accessPeriodStart',
                        dayjs(value).format('YYYY-MM-DDTHH:mm:ss')
                      );
                    }}
                    errorMessage={
                      (formik.touched.accessPeriodStart &&
                        formik.errors.accessPeriodStart) ||
                      ''
                    }
                  />
                  <DatePicker
                    disabled={!!guestId}
                    label="Data Final"
                    value={valueAccessPeriodEnd}
                    onChangeValue={(value: Date | null) => {
                      setValueAccessPeriodEnd(value);
                      formik.setFieldValue(
                        'accessPeriodEnd',
                        dayjs(value).format('YYYY-MM-DDTHH:mm:ss')
                      );
                    }}
                    errorMessage={
                      (formik.touched.accessPeriodEnd &&
                        formik.errors.accessPeriodEnd) ||
                      ''
                    }
                  />
                </Styled.DatePickerWrapper>
              </PeriodSchedules>
            </Column>
          </Wrapper>
          {isLoading && (
            <LoadingWrapper>
              <Loading />
            </LoadingWrapper>
          )}
          <Footer>
            {!guestId && (
              <Button disabled={isLoading} type="submit">
                Salvar cadastro
              </Button>
            )}
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
