import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';

import {
  Button,
  Checkbox,
  Input,
  Loading,
  Toast,
  Typography,
} from '@/components';
import { ToastVariants } from '@/components/Toast/Toast.types';
import { getUserCompany } from '@/flux/modules/company/actions';
import { clearSigIn, sigIn } from '@/flux/modules/sigIn/actions';
import { getUserInfo } from '@/flux/modules/user/actions';
import { useSigIn } from '@/hook/selectors/sigInHooks';
import { useAppDispatch } from '@/hook/store';
import { GenericErrorType } from '@/models/errors';
import { RequestStatus } from '@/models/iRequest';
import { emptyMask } from '@/utils/functions';
import { siginSchema } from '@/utils/schemas';
import { isAuthenticated, login } from '@/utils/services/auth';

import * as Styled from './Sigin.styled';

type UserType = {
  cpf: string;
  password: string;
};

export const SiginPresentation: FC = () => {
  const dispatch = useAppDispatch();
  const { status, message, data } = useSigIn();
  const navigate = useNavigate();

  const [toastVariant, setToastVariant] = useState<ToastVariants>('success');
  const [checked, setChecked] = useState<CheckboxRadix.CheckedState>(false);

  useEffect(() => {
    if (status === RequestStatus.error) {
      if (message === GenericErrorType.Request401) {
        setToastVariant('error');
        toast('Email ou senha inválidos!', { id: 'error' });
      } else {
        setToastVariant('error');
        toast('Falha ao tentar efetuar o login', { id: 'error' });
      }
    }

    if (status === RequestStatus.success && !isEmpty(data)) {
      login(data.access);
      dispatch(clearSigIn());
      dispatch(getUserInfo.request());
      dispatch(getUserCompany.request());
      navigate('/usuarios');
    }
  }, [status, message, data]);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/usuarios');
    }
  }, []);

  const isLoading = status === RequestStatus.fetching;

  const handleSubmit = () => {
    dispatch(
      sigIn.request({
        username: emptyMask(formik.values.cpf),
        password: formik.values.password,
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      cpf: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
    validationSchema: () => siginSchema,
  });

  useEffect(() => {
    const localStorageUser = localStorage.getItem('REMEMBER_SIGN');
    if (localStorageUser !== null) {
      const user: UserType = JSON.parse(localStorageUser) as UserType;
      formik.setFieldValue('cpf', user.cpf);
      formik.setFieldValue('password', user.password);
      setChecked(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setChecked(false);
    localStorage.removeItem('REMEMBER_SIGN');
  };

  const handleChangeCheckbox = (value: CheckboxRadix.CheckedState) => {
    setChecked(value);
    if (value) {
      localStorage.setItem(
        'REMEMBER_SIGN',
        JSON.stringify({
          cpf: emptyMask(formik.values.cpf),
          password: formik.values.password,
        })
      );
    } else {
      localStorage.removeItem('REMEMBER_SIGN');
    }
  };

  return (
    <Styled.Wrapper>
      <Styled.Form onSubmit={formik.handleSubmit}>
        <img className="logo" alt="logo globalpass" src="/logo.svg" />
        <Typography variant="title" spacing="xl">
          Seja bem vindo
        </Typography>
        <Input
          label="CPF"
          mask="cpf"
          value={formik.values.cpf}
          spacing="md"
          errorMessage={(formik.touched.cpf && formik.errors.cpf) || ''}
          id="cpf"
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          label="Senha"
          value={formik.values.password}
          type="password"
          spacing="xl"
          errorMessage={
            (formik.touched.password && formik.errors.password) || ''
          }
          id="password"
          onChange={handleChange}
          onBlur={formik.handleBlur}
        />
        {isLoading && (
          <Styled.LoadingWrapper>
            <Loading />
          </Styled.LoadingWrapper>
        )}
        <Styled.Row>
          <Checkbox checked={checked} onCheckedChange={handleChangeCheckbox}>
            Lembrar meu login
          </Checkbox>
          {/* <Button variant="link" type="button">
            Esqueci minha senha
          </Button> */}
        </Styled.Row>
        <Button disabled={isLoading} fullWidth>
          Prosseguir
        </Button>
      </Styled.Form>

      <Styled.SiginImage />
      <Toast variant={toastVariant} id={toastVariant} />
    </Styled.Wrapper>
  );
};
