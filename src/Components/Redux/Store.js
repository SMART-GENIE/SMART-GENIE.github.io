import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from './Reducer/MenuReducer';
import AuthReducer from './Reducer/AuthReducer';
import PartnersLevelJson from './Reducer/PartnersLevelJson';


export default configureStore({
  reducer: {
    menu: MenuReducer,
    auth:AuthReducer,
    partnersLevelJson:PartnersLevelJson

  },
});
