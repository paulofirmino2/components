import { FC } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import ptBr from 'date-fns/locale/pt-BR';

import * as S from './DatePicker.styled';
import { DatePickerProps } from './DatePicker.types';

const DatePickerComponent: FC<DatePickerProps> = ({
  spacing,
  errorMessage,
  onChangeValue,
  disabled,
  ...other
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBr}>
    <S.Wrapper spacing={spacing}>
      <DesktopDatePicker
        disabled={disabled}
        onChange={newValue => onChangeValue(newValue)}
        slotProps={{
          textField: {
            error: !!errorMessage,
          },
          layout: {
            sx: {
              '.MuiPickersDay-root': {
                borderRadius: 2,
                fontSize: 14,
                borderWidth: 2,
                border: 'none',
              },
            },
          },
        }}
        {...other}
      />
      {!!errorMessage && <S.Error>{errorMessage}</S.Error>}
    </S.Wrapper>
  </LocalizationProvider>
);
export default DatePickerComponent;
