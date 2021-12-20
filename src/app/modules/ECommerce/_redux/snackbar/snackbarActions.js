import { snackbarSlice } from './snackbarSlice';
const { actions } = snackbarSlice;

export const setSnackbar = (payload) => (dispatch) => {
  const { status, message, show } = payload;
  dispatch(actions.setSnackbar({ status, message, show }));
};
