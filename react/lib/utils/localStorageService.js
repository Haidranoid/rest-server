import store from "../../redux/store/store";

export const loadReducer = (reducerName, defaultState, callback = (state) => state) => {
    const serializedStore = localStorage.getItem('store');
    const store = JSON.parse(serializedStore);

    if (store) return callback(store[reducerName]);
    else return defaultState
};

export const saveStore = store => {
    const currentStore = store.getState();
    const serializedStore = JSON.stringify(currentStore);
    localStorage.setItem('store', serializedStore);
};

export const clearStore = () => {
  localStorage.removeItem('store');
};