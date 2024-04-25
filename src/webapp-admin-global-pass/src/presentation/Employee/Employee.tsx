import { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { findIndex } from 'lodash';

import {
  Button,
  ContentHeader,
  Input,
  Table,
  Toast,
  Typography,
} from '@/components';
import { Card } from '@/components/Card';
import { ToastVariants } from '@/components/Toast/Toast.types';
import {
  clearDeleteEmployee,
  deleteEmployeeById,
  searchEmployees,
} from '@/flux/modules/employee/actions';
import { EmployeesSearch } from '@/flux/modules/employee/types';
import { useMyCompanies } from '@/hook/selectors/companyHooks';
import {
  useDeleteEmployee,
  useSearchEmployee,
} from '@/hook/selectors/employeeHooks';
import { useUser } from '@/hook/selectors/userHooks';
import { useAppDispatch } from '@/hook/store';
import { RequestStatus } from '@/models/iRequest';
import { emptyMask } from '@/utils/functions';

import { createColumns } from './createColumns';
import { EmployeeDialog } from './EmployeeDialog';

export const EmployeePresentation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status: statusSearch, data: dataSearch } = useSearchEmployee();
  const { status: statusDelete } = useDeleteEmployee();
  const { data: companyData } = useMyCompanies();
  const { data: dataUser } = useUser();

  const [search, setSearch] = useState<string>('');
  const [showCpf, setShowCpf] = useState<boolean>(false);
  const [searchInit, setSearchInit] = useState<boolean>(false);

  const [employeeSelectedForDeleted, setEmployeeSelectedForDeleted] =
    useState<EmployeesSearch | null>(null);
  const [dataTableFiltered, setDataTableFiltered] = useState<EmployeesSearch[]>(
    []
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [toastVariant, setToastVariant] = useState<ToastVariants>('success');

  useEffect(() => {
    if (statusDelete === RequestStatus.error) {
      setToastVariant('error');
      toast('Falha ao excluir usuário', { id: 'error' });
    }

    if (statusDelete === RequestStatus.success && dataUser) {
      setToastVariant('success');
      dispatch(
        searchEmployees.request({
          companyId: dataUser?.extra_data.company,
        })
      );
      setSearch('');
      toast('Usuário excluído com sucesso!', { id: 'success' });
    }
    setOpenDialog(false);
    dispatch(clearDeleteEmployee());
  }, [statusDelete, dataUser]);

  useEffect(() => {
    if (dataUser) {
      dispatch(
        searchEmployees.request({
          companyId: dataUser?.extra_data.company || '',
        })
      );
    }
  }, [dataUser]);

  useEffect(() => {
    if (statusSearch === RequestStatus.success) {
      if (dataSearch) {
        setDataTableFiltered(dataSearch);

        if (search) {
          setShowCpf(true);
        }
      }
    }
  }, [statusSearch, dataSearch]);

  const handleEdit = (id: string) => {
    navigate(`/usuarios/editar/${id}`);
  };

  const handleDeleteConfirmation = (employeesSelected: EmployeesSearch) => {
    setOpenDialog(true);
    setEmployeeSelectedForDeleted(employeesSelected);
  };

  const handleRedirect = () => {
    navigate('/usuarios/adicionar');
  };

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setShowCpf(false);
    if (event.target.value.length === 14) {
      setSearchInit(true);
      dispatch(
        searchEmployees.request({
          companyId: dataUser?.extra_data.company || '',
          search: emptyMask(event.target.value),
        })
      );
    } else if (event.target.value === '' && searchInit) {
      setSearchInit(false);
      dispatch(
        searchEmployees.request({
          companyId: dataUser?.extra_data.company || '',
        })
      );
    }
    setSearch(event.target.value);
  };

  const handleDelete = () => {
    if (employeeSelectedForDeleted) {
      dispatch(deleteEmployeeById.request(employeeSelectedForDeleted.id));
    }
  };

  const sanitizeCompany = (companyId: string) => {
    const idx = findIndex(companyData, ['id', companyId]);
    if (idx !== -1 && companyData) {
      return companyData[idx].fantasy_name === '0'
        ? companyData[idx].name
        : companyData[idx].fantasy_name;
    }
    return '-';
  };

  return (
    <>
      <Typography variant="title" spacing="lg">
        Gerenciamento de Usuários
      </Typography>
      <Card>
        <ContentHeader>
          <Input
            sizevariant="sm"
            placeholder="Digite cpf do usuário"
            iconleft="search"
            mask="cpf"
            onChange={handleChangeSearch}
            value={search}
          />
          <Button type="button" sizevariant="sm" onClick={handleRedirect}>
            Novo Cadastro
          </Button>
        </ContentHeader>
        <Table
          dataTable={dataTableFiltered}
          loading={statusSearch === RequestStatus.fetching}
          columns={createColumns({
            onDelete: handleDeleteConfirmation,
            onEdit: handleEdit,
            sanitizeCompany,
            showCpf,
          })}
        />
        {employeeSelectedForDeleted && (
          <EmployeeDialog
            open={openDialog}
            setOpen={setOpenDialog}
            employeeSelectedForDeleted={employeeSelectedForDeleted}
            setEmployeeSelectedForDeleted={setEmployeeSelectedForDeleted}
            onDelete={handleDelete}
          />
        )}
      </Card>
      <Toast variant={toastVariant} id={toastVariant} />
    </>
  );
};
