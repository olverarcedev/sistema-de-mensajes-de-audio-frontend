export const getAudioMessages = async () => {
    const response = await fetch("http://localhost:3000/audio-message", {
        credentials: "include"
    }
    );
    if (!response.ok) {
        console.error("Error getting audio messages");
    }
    const audioMessages: AudioMessage[] = await response.json();
    return audioMessages;
};

export const saveAudioMessage = async (form: FormData): Promise<AudioMessage | null> => {
    const response = await fetch(
        "http://localhost:3000/audio-message",
        {
            credentials: "include",
            method: "POST",
            body: form,
        }
    );
    if (response.ok) {
        const audioMessage: AudioMessage = await response.json();
        return audioMessage;
    } else {
        console.error("audio message not saved");
        return null;
    }

}