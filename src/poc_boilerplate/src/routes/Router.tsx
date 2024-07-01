import { FC, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppDispatch } from '@/hook/store';
import { EmployeeFormPresentation } from '@/presentation';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeFormPresentation />} />
    </Routes>
  );
};

export default Router;
