interface AudioMessage {
    id: number;
    audioSrc: string;
    textRecognized: string;
    textIntent: string;
    createdAt: Date;
    senderId: number;
    sender: User;
}