import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as localStorageService from '../../lib/utils/localStorageService'

import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
    authReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
   localStorageService.saveStore(store)
});

export default store;
