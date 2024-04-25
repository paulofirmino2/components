import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ActionWrapper, Link, Tag } from '@/components/Table/UtilsComponents';
import { Guest } from '@/flux/modules/guest/types';
import { formatStatusAccept } from '@/models/guest';
import { SanitizeRole, SanitizeStatusAccept } from '@/types/Guest';

export const createColumns = ({
  showCpf,
  onShowDetails,
}: {
  showCpf: boolean;
  onShowDetails: (id: string) => void;
}) => {
  const columns: GridColDef[] = [
    {
      field: 'user.username',
      sortable: false,
      headerName: 'CPF',
      minWidth: 140,

      renderCell: (params: GridRenderCellParams<Guest, string>) =>
        showCpf
          ? params.row.username.replace(
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
      renderCell: (params: GridRenderCellParams<Guest, string>) => (
        <Tag
          variant={formatStatusAccept(
            params.row.accepted !== undefined && params.row.accepted
          )}
        >
          {
            SanitizeStatusAccept[
              formatStatusAccept(
                params.row.accepted !== undefined && params.row.accepted
              )
            ]
          }
        </Tag>
      ),
    },
    {
      field: 'user.data.userCompleteName',
      sortable: false,
      headerName: 'Nome',
      minWidth: 200,
      renderCell: (params: GridRenderCellParams<Guest, string>) => (
        <span id="name"> {params.row.data.name}</span>
      ),
    },
    {
      minWidth: 150,
      field: 'role',
      sortable: false,
      headerName: 'Perfil',

      renderCell: (params: GridRenderCellParams<Guest, string>) =>
        SanitizeRole[params.row.role],
    },
    {
      field: 'action',
      sortable: false,
      headerName: 'Ações',
      minWidth: 350,
      renderCell: (params: GridRenderCellParams<Guest, string>) => (
        <ActionWrapper>
          <Link onClick={() => onShowDetails(params.row.id || '')}>
            Detalhe
          </Link>
        </ActionWrapper>
      ),
    },
  ];

  return columns;
};
