import { createStore } from 'redux'
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(persistedReducer, process.env.NODE_ENV === 'development' && devTools)
export const persistor = persistStore(store);