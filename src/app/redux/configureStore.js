import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';



import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};




const pReducer = persistReducer(persistConfig, rootReducer);


export default function configureStore() {
    let store  = createStore(pReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);

    return {store, persistor}

}