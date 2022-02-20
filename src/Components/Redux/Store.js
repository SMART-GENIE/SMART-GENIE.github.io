import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from './Reducer/MenuReducer';
import AuthReducer from './Reducer/AuthReducer';


export default configureStore({
  reducer: {
    menu: MenuReducer,
    auth:AuthReducer
  },
});
