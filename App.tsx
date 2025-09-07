import { Rect, Canvas as SKCanvas } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, View } from "react-native";
import { FrequencyChart } from "./FrequencyChart";
import { Info } from "./Info";
import { FFT_SIZE, PLAYER_WIDTH } from "./Constants";
import { useAudioPlayer } from "./useAudioPlayer";
import { Underline } from "./Underline";

const { width: screenWidth } = Dimensions.get("window");

const AudioVisualizer: React.FC = () => {
  const {
    isPlaying,
    isLoading,
    freqs,
    handlePlayPause,
    percentComplete,
    audioBuffer,
  } = useAudioPlayer("https://audionautix.com/Music/Essence.mp3");

  return (
    <View style={{ flex: 1 }}>
      <FrequencyChart data={freqs} dataSize={FFT_SIZE / 2} />

      <Info
        handlePlayPause={handlePlayPause}
        isAudioBufferRef={Boolean(audioBuffer)}
        isLoading={isLoading}
        isPlaying={isPlaying}
        percentComplete={percentComplete}
      />
    </View>
  );
};

export default AudioVisualizer;
