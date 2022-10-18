import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { AppDispatch, RootState } from './interfaces';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const store = configureStore({
  reducer: rootReducer(),
});

export { store };
