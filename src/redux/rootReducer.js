import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import * as auth from '../app/modules/Auth/_redux/authRedux';
import { customersSlice } from '../app/modules/ECommerce/_redux/customers/customersSlice';
import { productsSlice } from '../app/modules/ECommerce/_redux/products/productsSlice';
import { remarksSlice } from '../app/modules/ECommerce/_redux/remarks/remarksSlice';
import { specificationsSlice } from '../app/modules/ECommerce/_redux/specifications/specificationsSlice';
import { usersSlice } from '../app/modules/ECommerce/_redux/users/usersSlice';
import { contactsSlice } from '../app/modules/ECommerce/_redux/contacts/contactsSlice';
import { contactsGroupSlice } from '../app/modules/ECommerce/_redux/contactsGroup/contactsSlice';
import { agenciesSlice } from '../app/modules/ECommerce/_redux/agencies/agenciesSlice';
import { rolesSlice } from '../app/modules/ECommerce/_redux/roles/rolesSlice';
import { platformAdminsSlice } from '../app/modules/ECommerce/_redux/platform-admins/platformAdminsSlice';
import { composeMessagesSlice } from '../app/modules/ECommerce/_redux/compose-messages/composeMessagesSlice';
import { reportsSlice } from '../app/modules/ECommerce/_redux/reports/reportsSlice';
import { snackbarSlice } from '../app/modules/ECommerce/_redux/snackbar/snackbarSlice';
import { activitiesSlice } from '../app/modules/ECommerce/_redux/activities/activitiesSlice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  contacts: contactsSlice.reducer,
  contactsGroup: contactsGroupSlice.reducer,
  users: usersSlice.reducer,
  agencies: agenciesSlice.reducer,
  roles: rolesSlice.reducer,
  platformAdmins: platformAdminsSlice.reducer,
  composeMessages: composeMessagesSlice.reducer,
  reports: reportsSlice.reducer,
  snackbar: snackbarSlice.reducer,
  activities: activitiesSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
