import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from './Reducer/MenuReducer';


export default configureStore({
  reducer: {
    menu: MenuReducer,
  },
});
