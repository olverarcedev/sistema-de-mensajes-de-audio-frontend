"use client";
import { useEffect, useState } from "react";
import AudioMessagesComponent from "./audio-messages.component";
import HeaderComponent from "./header.component";
import VoiceRecorderComponent from "./voice-recorder.component";
import { verifyToken } from "@/services/user.service";
import { useRouter } from "next/navigation";
import Statistics from "./statistics";

export default function Chat() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await verifyToken();
      if (!user) {
        router.push("/auth");
      } else {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <HeaderComponent />

      <div className="flex flex-grow h-2/3 bg-slate-400">
        <div className="w-1/3 flex items-center bg-white">
          <Statistics />
        </div>

        <div className="w-2/3">
          <div className="h-[87%] overflow-y-auto border border-gray-300">
            <AudioMessagesComponent />
          </div>
          <div>
            <VoiceRecorderComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
