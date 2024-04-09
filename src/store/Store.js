import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../slices/AuthSlice';
import ItemMasterSlice from '../slices/ItemMasterSlice';
import NewEmpSlice from '../slices/NewEmpSlice';
import NewItemSlice from '../slices/NewItemSlice';
import saveBomSlice from '../slices/saveBomSlice';
import DashBoardPieCharSlice from '../slices/DashBoardPieCharSlice';
import NotificationSlice from '../slices/NotificationSlice';


const store = configureStore({
  reducer: {
    auth: AuthSlice,
    item: ItemMasterSlice,
    empreg: NewEmpSlice,
    newItem: NewItemSlice,
    newBom: saveBomSlice,
    dashPie: DashBoardPieCharSlice,
    noti:NotificationSlice
  },

  devTools: import.meta.env.DEV,
});

export default store;
