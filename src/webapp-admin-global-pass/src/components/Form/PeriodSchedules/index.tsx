import { ChangeEvent, FC } from 'react';
import * as CheckboxRadix from '@radix-ui/react-checkbox';
import { find, findIndex } from 'lodash';

import { Checkbox, Input, Typography } from '@/components';
import { useFillEmployee } from '@/hook/employee/employeeHooks';
import { Schedules } from '@/types/Employee';

import * as Styled from './PeriodSchedules.styled';

const RESET_START = '00:00';
const RESET_END = '23:59';

type Props = {
  title: string;
  schedules: Schedules[];
  onChangeSchedules: (schedules: Schedules[]) => void;
  children?: React.ReactNode;
};

export const PeriodSchedules: FC<Props> = ({
  schedules,
  onChangeSchedules,
  title,
  children,
}) => {
  const { schedulesList } = useFillEmployee();

  const handleChangeCheckbox = (
    checkedCurrent: CheckboxRadix.CheckedState,
    id: string
  ) => {
    const newSchedules = [...schedules];
    const idx = findIndex(newSchedules, schedule => schedule.id === id);
    if (idx !== -1) {
      newSchedules[idx].checked = checkedCurrent as boolean;
      if (!checkedCurrent) {
        newSchedules[idx].start = RESET_START;
        newSchedules[idx].end = '00:00';
      } else {
        newSchedules[idx].start = RESET_START;
        newSchedules[idx].end = RESET_END;
      }
      onChangeSchedules(newSchedules);
    }
  };

  const getScheduleById = (id: string) =>
    find(schedules, schedule => schedule.id === id);

  const setScheduleById = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    type: 'start' | 'end'
  ) => {
    const newSchedules = [...schedules];
    const idx = findIndex(newSchedules, schedule => schedule.id === id);
    if (idx !== -1) {
      newSchedules[idx][type] = e.target.value;
      onChangeSchedules(newSchedules);
    }
  };

  return (
    <Styled.SchedulesWrapper>
      <Typography variant="subTitle" spacing="md">
        {title}
      </Typography>
      {children}
      {schedulesList.map(({ id, label }) => (
        <Styled.SchedulesRow key={id}>
          <Styled.CheckboxWrapper>
            <Checkbox
              onCheckedChange={e => handleChangeCheckbox(e, id)}
              checked={getScheduleById(id)?.checked}
            >
              {label}
            </Checkbox>
          </Styled.CheckboxWrapper>
          <Input
            sizevariant="sm"
            mask="hour"
            value={getScheduleById(id)?.start}
            disabled={!getScheduleById(id)?.checked}
            onChange={e => setScheduleById(e, id, 'start')}
          />
          <Styled.Separator>às</Styled.Separator>
          <Input
            sizevariant="sm"
            mask="hour"
            value={getScheduleById(id)?.end}
            disabled={!getScheduleById(id)?.checked}
            onChange={e => setScheduleById(e, id, 'end')}
          />
        </Styled.SchedulesRow>
      ))}
    </Styled.SchedulesWrapper>
  );
};
