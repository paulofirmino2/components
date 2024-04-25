import { FC } from 'react';
import { Box } from '@mui/material';
import { DataGrid, ptBR } from '@mui/x-data-grid';

import { TableStyledProps } from './Table.types';

const Table: FC<TableStyledProps> = ({ loading, columns, dataTable }) => (
  <Box
    sx={{
      height: 550,
      width: '100%',
      fontSize: 16,
      '& .MuiDataGrid-root': {
        border: 'none',
        fontSize: 16,
      },
      '& .MuiDataGrid-row': {
        bgcolor: '#ffffff',
      },
      '& .MuiDataGrid-columnHeaders': {
        fontSize: 16,
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 600,
      },
      '& .MuiTablePagination-displayedRows': {
        fontSize: 16,
      },
      '& .MuiTablePagination-actions': {
        fontSize: 16,
      },
      '& .MuiSvgIcon-root': {
        fontSize: 16,
        width: '2rem',
        height: '2rem',
      },
    }}
  >
    <DataGrid
      hideFooterSelectedRowCount
      disableColumnMenu
      disableColumnFilter
      loading={loading}
      rows={dataTable}
      columns={columns}
      autoPageSize
      localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
    />
  </Box>
);

export default Table;
