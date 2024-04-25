import { Schedules } from '@/types/Employee';

export const useFillEmployee = () => {
  const fillAccessPeriod = (schedules: Schedules[]) => ({
    monday: {
      end: schedules[0].end,
      start: schedules[0].start,
    },
    tuesday: {
      end: schedules[1].end,
      start: schedules[1].start,
    },
    wednesday: {
      end: schedules[2].end,
      start: schedules[2].start,
    },
    thursday: {
      end: schedules[3].end,
      start: schedules[3].start,
    },
    friday: {
      end: schedules[4].end,
      start: schedules[4].start,
    },
    saturday: {
      end: schedules[5].end,
      start: schedules[5].start,
    },
    sunday: {
      end: schedules[6].end,
      start: schedules[6].start,
    },
  });

  const schedulesList = [
    {
      id: 'monday',
      label: 'Segunda',
    },
    {
      id: 'tuesday',
      label: 'Terça',
    },
    {
      id: 'wednesday',
      label: 'Quarta',
    },
    {
      id: 'thursday',
      label: 'Quinta',
    },
    {
      id: 'friday',
      label: 'Sexta',
    },
    {
      id: 'saturday',
      label: 'Sábado',
    },
    {
      id: 'sunday',
      label: 'Domingo',
    },
  ];

  const EMPTY_SCHEDULES = [
    {
      id: 'monday',
      start: '00:00',
      end: '23:59',
      checked: true,
    },
    {
      id: 'tuesday',
      start: '00:00',
      end: '23:59',
      checked: true,
    },
    {
      id: 'wednesday',
      start: '00:00',
      end: '23:59',
      checked: true,
    },
    {
      id: 'thursday',
      start: '00:00',
      end: '23:59',
      checked: true,
    },
    {
      id: 'friday',
      start: '00:00',
      end: '23:59',
      checked: true,
    },
    {
      id: 'saturday',
      start: '00:00',
      end: '23:59',
      checked: true,
    },
    {
      id: 'sunday',
      start: '00:00',
      end: '23:59',
      checked: true,
    },
  ];

  return { fillAccessPeriod, emptySchedules: EMPTY_SCHEDULES, schedulesList };
};
