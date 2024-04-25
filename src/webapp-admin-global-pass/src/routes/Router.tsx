import { FC, ReactNode, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { findIndex, uniqueId } from 'lodash';

import { MainLayout, PrivateRoute } from '@/components';
import { getUserCompany } from '@/flux/modules/company/actions';
import { getUserInfo, setUserRole } from '@/flux/modules/user/actions';
import { useUserCompanies } from '@/hook/selectors/companyHooks';
import { useUser } from '@/hook/selectors/userHooks';
import { useAppDispatch } from '@/hook/store';
import {
  CompanyFormPresentation,
  CompanyPresentation,
  EmployeeFormPresentation,
  EmployeePresentation,
  GuestFormPresentation,
  GuestPresentation,
  HomePresentation,
  PageNotFoundPresentation,
  SiginPresentation,
} from '@/presentation';
import { isAuthenticated } from '@/utils/services/auth';

type RenderMultiRoutesPayload = {
  element: ReactNode;
  paths: string[];
};

const Router: FC = () => {
  const dispatch = useAppDispatch();
  const { data: dataCompanies } = useUserCompanies();
  const { data: dataUser } = useUser();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(getUserInfo.request());
      dispatch(getUserCompany.request());
    }
  }, []);

  useEffect(() => {
    if (dataUser && dataCompanies) {
      if (!dataUser.role) {
        const idx = findIndex(
          dataCompanies,
          item => item.company.id === dataUser.extra_data.company
        );

        if (idx !== -1) {
          dispatch(setUserRole(dataCompanies[idx].role));
        }
      }
    }
  }, [dataUser, dataCompanies]);

  const renderMultiRoutes = ({
    element: Element,
    paths,
    ...rest
  }: RenderMultiRoutesPayload) =>
    paths.map((path: string) => (
      <Route key={uniqueId()} path={path} {...rest} element={Element} />
    ));

  return (
    <Routes>
      <Route path="*" element={<PageNotFoundPresentation />} />
      <Route path="/" element={<SiginPresentation />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <MainLayout>
              <HomePresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <PrivateRoute>
            <MainLayout>
              <EmployeePresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/convites"
        element={
          <PrivateRoute>
            <MainLayout>
              <GuestPresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/empresa"
        element={
          <PrivateRoute>
            <MainLayout>
              <CompanyPresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/usuarios/adicionar"
        element={
          <PrivateRoute>
            <MainLayout>
              <EmployeeFormPresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/usuarios/editar/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <EmployeeFormPresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/convite/adicionar"
        element={
          <PrivateRoute>
            <MainLayout>
              <GuestFormPresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/convite/detalhe/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <GuestFormPresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/empresa/adicionar"
        element={
          <PrivateRoute>
            <MainLayout>
              <CompanyFormPresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/empresa/editar/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <CompanyFormPresentation />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {renderMultiRoutes({
        paths: ['/eventos'],
        element: (
          <PrivateRoute>
            <MainLayout>
              <PageNotFoundPresentation />
            </MainLayout>
          </PrivateRoute>
        ),
      })}
    </Routes>
  );
};

export default Router;
