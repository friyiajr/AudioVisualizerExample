import { RoundedRect, Canvas as SKCanvas } from "@shopify/react-native-skia";
import React, { useMemo, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { FFT_SIZE, GROUP_QUANTITY, PLAYER_WIDTH } from "./Constants";

interface Point {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

interface ChartProps {
  data: Uint8Array;
  dataSize: number;
}

interface Size {
  width: number;
  height: number;
}

export const FrequencyChart: React.FC<ChartProps> = (props) => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const { data, dataSize } = props;

  const onCanvasLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;

    setSize({ width, height });
  };

  const barWidth = size.width / (FFT_SIZE / 2 / GROUP_QUANTITY) - 5;

  const points = useMemo(() => {
    const p: Point[] = [];

    let runningTotal = 0;

    for (let i = 0; i < FFT_SIZE / 2; i += GROUP_QUANTITY) {
      for (let j = i; j < i + GROUP_QUANTITY; j++) {
        runningTotal += data[j];
      }

      const average = runningTotal / GROUP_QUANTITY;

      const x = i + 1 / GROUP_QUANTITY;
      const y1 = size.height;
      const y2 = size.height - size.height * (average / FFT_SIZE / 2);

      const color = "black";

      p.push({
        x1: x,
        x2: x,
        y1,
        y2,
        color,
      });

      runningTotal = 0;
    }

    return p;
  }, [size, data, dataSize]);

  return (
    <SKCanvas
      style={{
        flex: 2,
        width: PLAYER_WIDTH,
        alignSelf: "center",
      }}
      onLayout={onCanvasLayout}
    >
      {points.map((point, index) => {
        return (
          <RoundedRect
            r={10}
            key={index}
            x={point.x1}
            y={point.y1}
            height={Math.min((point.y2 - point.y1) * 4, -10)}
            width={barWidth}
            color={point.color}
          />
        );
      })}
    </SKCanvas>
  );
};
