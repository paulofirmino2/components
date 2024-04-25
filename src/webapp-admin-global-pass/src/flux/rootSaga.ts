import { all } from 'redux-saga/effects';

import companySaga from './modules/company/sagas';
import dashboardSaga from './modules/dashboard/sagas';
import employeeSaga from './modules/employee/sagas';
import userGuest from './modules/guest/sagas';
import sigInSaga from './modules/sigIn/sagas';
import userSaga from './modules/user/sagas';

function* rootSaga() {
  yield all([
    ...sigInSaga,
    ...userSaga,
    ...employeeSaga,
    ...dashboardSaga,
    ...companySaga,
    ...userGuest,
  ]);
}

export default rootSaga;
