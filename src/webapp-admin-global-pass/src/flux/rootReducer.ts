import companyReducer from './modules/company/reducers';
import dashboardReducer from './modules/dashboard/reducers';
import employeeReducer from './modules/employee/reducers';
import guestReducer from './modules/guest/reducers';
import sigInReducer from './modules/sigIn/reducers';
import userReducer from './modules/user/reducers';

const rootReducer = () => ({
  sigIn: sigInReducer,
  user: userReducer,
  employee: employeeReducer,
  dashboard: dashboardReducer,
  company: companyReducer,
  guest: guestReducer,
});

export default rootReducer;
