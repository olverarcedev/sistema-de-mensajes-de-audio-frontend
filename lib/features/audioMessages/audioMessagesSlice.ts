import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface AudioMessagesState {
    audioMessages: AudioMessage[]
}
const initialState: AudioMessagesState = { audioMessages: [] };
const audioMessagesSlice = createSlice({
    name: 'audioMessagesSlice',
    initialState,
    reducers: {
        initializeAudioMessages(state, action: PayloadAction<AudioMessage[]>) {
            state.audioMessages = action.payload.sort((a: AudioMessage, b: AudioMessage) => {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });

        },
        addAudioMessage(state, action: PayloadAction<AudioMessage>) {
            console.log(action.payload);
            state.audioMessages.push(action.payload);
            console.log(state.audioMessages);
        },
    }
});

export const { initializeAudioMessages, addAudioMessage } = audioMessagesSlice.actions;
export default audioMessagesSlice.reducer;