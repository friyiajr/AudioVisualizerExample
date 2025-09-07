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

  return (
    <SKCanvas
      style={{
        flex: 2,
        width: PLAYER_WIDTH,
        alignSelf: "center",
      }}
      onLayout={onCanvasLayout}
    ></SKCanvas>
  );
};
