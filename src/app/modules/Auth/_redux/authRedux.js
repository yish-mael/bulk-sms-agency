import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action',
  updateDepartment: '[SET DEPARTMENT DETAILS]',
  ressetToken: '[RESSET_TOKEN]'
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  ressetToken: undefined
};

export const reducer = persistReducer(
  { storage, key: 'v713-demo1-auth', whitelist: ['user', 'authToken'] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken, user } = action.payload;

        return { authToken, user };
      }

      case actionTypes.updateDepartment: {
        const user = state.user;
        user.groupId = action.payload;
        state = {...state,user: user};
        return state;
      }

      case actionTypes.ressetToken: {
        state = {...state,ressetToken: action.payload};
        return state;
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  setRessetToken: (token) => ({
    type: actionTypes.ressetToken,
    payload: token
   }), 
  updateDepartment: (department) => ({
   type: actionTypes.updateDepartment,
   payload: department
  }), 
  login: (authToken, user) => ({
    type: actionTypes.Login,
    payload: { authToken, user },
  }),
  register: (authToken) => ({
    type: actionTypes.Register,
    payload: { authToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
};

export function* saga() {
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.requestUser());
  // });
  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });
  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken();
  //   yield put(actions.fulfillUser(user));
  // });
}
