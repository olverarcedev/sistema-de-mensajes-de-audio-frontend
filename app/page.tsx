import CanvasComponent from "./components/canvas.component";
import CounterComponent from "./components/counter.component";

export default function Home() {
  return (
    <div className="p-3">
      <h1>Agrega un barco</h1>
      <CanvasComponent />
    </div>
  );
}
