/* eslint-disable jsx-a11y/anchor-is-valid */
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import moment from 'moment';

import { ActionWrapper, Link, Tag } from '@/components/Table/UtilsComponents';
import { Company } from '@/flux/modules/company/types';

export const createColumns = ({
  onEdit,
}: {
  onEdit: (id: string) => void;
  showCpf: boolean;
}) => {
  const columns: GridColDef[] = [
    {
      field: 'cnpj',
      sortable: false,
      headerName: 'CNPJ',
      minWidth: 160,

      renderCell: (params: GridRenderCellParams<Company, string>) =>
        params.row.cnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          '$1.$2.$3/$4-$5'
        ),
    },
    {
      field: 'blocked',
      sortable: false,
      minWidth: 120,
      headerName: 'Status',
      renderCell: (params: GridRenderCellParams<Company, string>) => (
        <Tag variant={params.row.blocked ? 'block' : 'active'}>
          {params.row.blocked ? 'Bloqueado' : 'Ativo'}
        </Tag>
      ),
    },
    {
      field: 'name',
      sortable: false,
      headerName: 'Empresa',
      minWidth: 250,
      renderCell: (params: GridRenderCellParams<Company, string>) => (
        <span id="name"> {params.row.name}</span>
      ),
    },
    {
      field: 'created_at',
      headerName: 'Data de Cadastro',
      sortable: false,
      width: 160,
      renderCell: (params: GridRenderCellParams<Company, string>) =>
        moment(params.row.created_at).format('DD/MM/YYYY'),
    },
    {
      field: 'action',
      sortable: false,
      headerName: 'Ações',
      minWidth: 350,
      renderCell: (params: GridRenderCellParams<Company, string>) => (
        <ActionWrapper>
          <Link onClick={() => onEdit(params.row.id || '')}>Editar</Link>
        </ActionWrapper>
      ),
    },
  ];

  return columns;
};
