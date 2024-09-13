"use client";

import Konva from "konva";
import { ShapeConfig } from "konva/lib/Shape";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Circle } from "react-konva";

export default function CanvasComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [circlesConfig, setCirclesConfig] = useState<Konva.CircleConfig[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const stageRef = useRef<Konva.Stage>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);

      window.addEventListener("click", () => {
        setShowMenu(false);
      });
    }
  }, []);

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null;
  }

  return (
    <div className="border border-slate-600">
      <Stage
        width={dimensions.width - 13}
        height={dimensions.height - 180}
        ref={stageRef}
        onContextMenu={(e) => {
          e.evt.preventDefault();
          if (e.target === stageRef.current) {
            return;
          }
          //   setCurrentShape(e.target);
        }}
        onDblClick={() => {
          const stage = stageRef.current;
          const pointerPosition = stage?.getPointerPosition();
          if (pointerPosition) {
            const circleConfig: Konva.CircleConfig = {
              x: pointerPosition.x,
              y: pointerPosition.y,
              radius: 10 + Math.random() * 30,
              fill: Konva.Util.getRandomColor(),
              shadowBlur: 10,
            };

            setCirclesConfig([...circlesConfig, circleConfig]);
          }
        }}
      >
        <Layer>
          <Circle
            x={dimensions.width / 2}
            y={dimensions.height / 2}
            radius={50}
            fill={"red"}
            shadowBlur={10}
          />
          {circlesConfig.map((circle, index) => {
            return (
              <Circle
                key={index}
                x={circle.x}
                y={circle.y}
                radius={circle.radius}
                fill={circle.fill}
                shadowBlur={circle.shadowBlur}
              />
            );
          })}
        </Layer>
      </Stage>
      {showMenu && (
        <div id="menu" ref={menuRef}>
          <div>
            <button id="pulse-button" onClick={() => {}}>
              Pulse
            </button>
            <button id="delete-button">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
