"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLines } from "@fortawesome/free-solid-svg-icons";
import { io, Socket } from "socket.io-client";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/lib/hooks";
import {
  addAudioMessage,
  initializeAudioMessages,
} from "@/lib/features/audioMessages/audioMessagesSlice";
import {
  getAudioMessages,
  saveAudioMessage,
} from "@/services/audio-messages.service";
import { socketUrl } from "@/services/socket-io.service";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);
// https://github.com/DeltaCircuit/react-media-recorder/issues/107

export default function voiceRecorderComponent() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const socket = useRef<Socket | null>(null);

  const sendMessage = (audioMessage: AudioMessage) => {
    const newMessage = JSON.stringify(audioMessage);
    if (socket.current) {
      socket.current.emit("message", newMessage);
    }
  };
  useEffect(() => {
    (async () => dispatch(initializeAudioMessages(await getAudioMessages())))();

    if (!socket.current || !socket.current.connected) {
      socket.current = io(socketUrl);
      socket.current.on("server-message", (newMessage: string) => {
        const message: AudioMessage = JSON.parse(newMessage);
        dispatch(addAudioMessage(message));
      });
    }
    return () => {
      if (!socket || !socket.current) return;
      socket.current.disconnect();
    };
  }, []);

  return (
    <ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => {
        const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        useEffect(() => {
          const onSubmit = async () => {
            if (status === "stopped" && isSubmitting) {
              if (!mediaBlobUrl) {
                console.error("No audio available to send");
                return;
              }
              const blob = await fetch(mediaBlobUrl).then((res) => res.blob());
              const form = new FormData();
              form.append("message", blob, "audio.wav");
              const audioMessage = await saveAudioMessage(form);
              if (audioMessage) {
                sendMessage(audioMessage);
                dispatch(addAudioMessage(audioMessage));
              }
              if (recordingTimeoutRef.current) {
                clearTimeout(recordingTimeoutRef.current);
                recordingTimeoutRef.current = null;
              }
              setIsSubmitting(false);
            }
          };
          onSubmit();
        }, [status]);
        const handleStartRecording = () => {
          startRecording();
          recordingTimeoutRef.current = setTimeout(() => {
            stopRecording();
            setIsSubmitting(true);
          }, 120000);
          setIsSubmitting(true);
        };
        const handleStopRecording = () => {
          stopRecording();
          setIsSubmitting(true);
        };
        return (
          <div className="flex justify-center p-2">
            <button
              onMouseDown={handleStartRecording}
              onMouseUp={handleStopRecording}
              className={`${
                status == "recording" ? "bg-slate-800" : "bg-slate-600"
              } text-white flex items-center rounded-full px-4 py-2 mr-3`}
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faMicrophoneLines}
                size={"1x"}
              />
              <span>Enviar mensaje de audio</span>
            </button>
          </div>
        );
      }}
    />
  );
}
