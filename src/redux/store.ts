import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootSlices';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
