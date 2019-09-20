import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber', // it determines which local storage will be used
      storage,
      // whitelist will receive all reducers that we will store informations
      // if you have another reducer which is not necessary to persist any data,
      // DO NOT include here
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
