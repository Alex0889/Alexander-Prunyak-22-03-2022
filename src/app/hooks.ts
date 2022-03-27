import { RootState, store } from './store';
import { useDispatch, useSelector } from 'react-redux';

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = () => useSelector((state: RootState) => state);
