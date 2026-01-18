import type { AppDispatch, RootState } from '@/app/providers/StoreProvider/store/store';
import { useDispatch, useSelector } from 'react-redux'
 
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()