import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    // It will join two objects
    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Profile updated successfully');

    yield put(updateProfileSuccess(response.data));
    // Updating profile and refresh page it will show older value, because we need update REDUX state
    // Open user reducer and include @user/UPDATE_PROFILE_SUCCESS to update it
  } catch (err) {
    toast.error('Error: profile updating failure, check your data.');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
