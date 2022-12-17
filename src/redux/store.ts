import { configureStore } from '@reduxjs/toolkit';
import helloReducer from './slices/hello';
import adsReducer from './slices/ads';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    ads: adsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
