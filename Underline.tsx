import React from "react";

import { Rect, Canvas as SKCanvas } from "@shopify/react-native-skia";
import { PLAYER_WIDTH } from "./Constants";
import { Dimensions } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

export const Underline = ({ percentComplete }: { percentComplete: number }) => {
  return (
    <SKCanvas style={{ height: 25, marginTop: 4 * 3 }}>
      <Rect
        x={screenWidth / 2 - PLAYER_WIDTH / 2}
        y={12.5}
        width={PLAYER_WIDTH}
        height={1}
      />
      <Rect
        x={screenWidth / 2 - PLAYER_WIDTH / 2}
        y={12.5 - 2}
        width={PLAYER_WIDTH * percentComplete}
        height={5}
      />
    </SKCanvas>
  );
};
