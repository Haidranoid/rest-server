import store from "../../redux/store/store";

export const loadReducer = (reducerName, initialState) => {
    let loadedReducer;
    const serializedStore = localStorage.getItem('store');
    const store = JSON.parse(serializedStore);

    if (store) loadedReducer = store[reducerName];
    else loadedReducer = initialState;

    return loadedReducer;
};

export const saveStore = store => {
    const currentStore = store.getState();
    const serializedStore = JSON.stringify(currentStore);
    localStorage.setItem('store', serializedStore);
};
