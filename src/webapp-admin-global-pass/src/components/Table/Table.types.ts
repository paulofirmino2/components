import { GridColDef } from '@mui/x-data-grid';

export type TableStyledProps = {
  loading?: boolean;
  columns: GridColDef[];
  dataTable: Array<object>;
};

export type TableProps = TableStyledProps;
