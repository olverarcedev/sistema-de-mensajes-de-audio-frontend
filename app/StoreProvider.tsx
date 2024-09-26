"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { initializeCount } from "../lib/features/counter/counterSlice";
import { initializeAudioMessages } from "@/lib/features/audioMessages/audioMessagesSlice";

export default function StoreProvider({
  count,
  audioMessages,
  children,
}: {
  count: number;
  audioMessages: AudioMessage[];
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeCount(count));
    storeRef.current.dispatch(initializeAudioMessages(audioMessages));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
