"use client";
import { decrement, increment } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

export default function CounterComponent() {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>counter: {counter}</p>
      <div className="text-white">
        <button
          className="bg-slate-500 mr-1 p-1 rounded-lg"
          onClick={() => dispatch(increment())}
        >
          increment
        </button>
        <button
          className="bg-slate-500 mr-1 p-1 rounded-lg"
          onClick={() => dispatch(decrement())}
        >
          decrement
        </button>
      </div>
    </div>
  );
}
