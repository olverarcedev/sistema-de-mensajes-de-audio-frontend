"use client";
import { useAppSelector } from "@/lib/hooks";
import { verifyToken } from "@/services/user.service";
import { useEffect, useState } from "react";

export default function AudioMessagesComponent() {
  const [user, setUser] = useState<User | null>(null);
  const audioMessages: AudioMessage[] = useAppSelector(
    (state) => state.audioMessages.audioMessages
  );

  useEffect(() => {
    (async () => setUser(await verifyToken()))();
  }, []);

  return (
    <div className="bg-slate-300 px-2">
      {audioMessages.length > 0 &&
        audioMessages.map((audioMessage: AudioMessage) => {
          const isMy = audioMessage.sender.id == user?.id;
          return (
            <div
              key={audioMessage.id}
              className={`flex items-center ${
                isMy ? "justify-end" : "justify-start"
              }`}
            >
              <div className="mx-4">
                <img
                  src={audioMessage.sender.iconSrc}
                  alt="userIcon"
                  height={50}
                  width={50}
                />
              </div>

              <div className="w-3/4">
                <b className="mr-2">{audioMessage.sender.name}</b>
                <i>
                  {new Date(audioMessage.createdAt).toLocaleString("es-CL", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </i>
                <i className="text-xs mx-1">
                  {audioMessage.textIntent != "none"
                    ? audioMessage.textIntent
                    : ""}
                </i>

                <div className="my-1">
                  <audio
                    controls
                    src={"http://localhost:3000" + "/" + audioMessage.audioSrc}
                    className="w-full"
                  ></audio>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
