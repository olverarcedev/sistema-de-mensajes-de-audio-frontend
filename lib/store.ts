import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import audioMessagesReducer from './features/audioMessages/audioMessagesSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            audioMessages: audioMessagesReducer
        },
    });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
