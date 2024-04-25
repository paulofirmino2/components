/* eslint-disable jsx-a11y/anchor-is-valid */
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { Avatar } from '@/components';
import {
  ActionWrapper,
  EmployeeWrapper,
  Link,
  Tag,
} from '@/components/Table/UtilsComponents';
import { EmployeesSearch } from '@/flux/modules/employee/types';
import { SanitizeStatus } from '@/types/Employee';
import { Role, SanitizeRole } from '@/types/Guest';

export const createColumns = ({
  onEdit,
  onDelete,
  showCpf,
  sanitizeCompany,
}: {
  onEdit: (id: string) => void;
  onDelete: (employeesSelected: EmployeesSearch) => void;
  showCpf: boolean;
  sanitizeCompany?: (companyId: string) => string;
}) => {
  const columns: GridColDef[] = [
    {
      field: 'user.username',
      sortable: false,
      headerName: 'CPF',
      minWidth: 140,

      renderCell: (params: GridRenderCellParams<EmployeesSearch, string>) =>
        showCpf
          ? params.row.user.username.replace(
              /(\d{3})(\d{3})(\d{3})(\d{2})/,
              '$1.$2.$3-$4'
            )
          : '***********',
    },
    {
      field: 'status',
      sortable: false,
      minWidth: 150,
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams<EmployeesSearch, string>) => (
        <Tag variant={params.row.status}>
          {SanitizeStatus[params.row.status]}
        </Tag>
      ),
    },
    {
      field: 'status_message',
      sortable: false,
      minWidth: 180,
      align: 'center',
      headerName: 'Situação',
      renderCell: (params: GridRenderCellParams<EmployeesSearch, string>) =>
        params.row.status_message || '-',
    },

    {
      field: 'user.extra_data.name',
      sortable: false,
      headerName: 'Usuários',
      minWidth: 250,
      renderCell: (params: GridRenderCellParams<EmployeesSearch, string>) => (
        <EmployeeWrapper>
          <Avatar
            src={params.row.user.photo}
            name={params.row.user.extra_data.name}
          />
          <span id="name"> {params.row.user.extra_data.name}</span>
        </EmployeeWrapper>
      ),
    },
    {
      field: 'company.name',
      sortable: false,
      headerName: 'Empresa',
      minWidth: 140,

      renderCell: (params: GridRenderCellParams<EmployeesSearch, string>) =>
        sanitizeCompany && sanitizeCompany(params.row.company.id || ''),
    },
    {
      minWidth: 150,
      field: 'role',
      sortable: false,
      headerName: 'Perfil',
      renderCell: (params: GridRenderCellParams<EmployeesSearch, string>) =>
        SanitizeRole[params.row.role || ''],
    },
    {
      field: 'blocked',
      sortable: false,
      minWidth: 120,
      headerName: 'Ativo',
      renderCell: (params: GridRenderCellParams<EmployeesSearch, string>) => (
        <Tag variant={params.row.blocked ? 'block' : 'active'}>
          {params.row.blocked ? 'Não' : 'Sim'}
        </Tag>
      ),
    },
    {
      field: 'action',
      sortable: false,
      headerName: 'Ações',
      minWidth: 350,
      renderCell: (params: GridRenderCellParams<EmployeesSearch, string>) => (
        <ActionWrapper>
          <Link onClick={() => onEdit(params.row.id)}>Editar</Link>
          {params.row.role !== Role.ADMINISTRATOR && (
            <Link onClick={() => onDelete(params.row)}>Excluir</Link>
          )}
        </ActionWrapper>
      ),
    },
  ];

  return columns;
};
