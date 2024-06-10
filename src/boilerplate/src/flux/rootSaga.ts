import { all } from 'redux-saga/effects';

import sigInSaga from './modules/sigIn/sagas';

function* rootSaga() {
  yield all([...sigInSaga]);
}

export default rootSaga;
