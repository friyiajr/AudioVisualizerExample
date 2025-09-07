import { View, Text, TouchableOpacity } from "react-native";
import { PLAYER_WIDTH } from "./Constants";
import { Underline } from "./Underline";

interface Props {
  handlePlayPause: () => void;
  isLoading: boolean;
  isPlaying: boolean;
  isAudioBufferRef: boolean;
  percentComplete: number;
}

export const Info = ({
  isLoading,
  handlePlayPause,
  isPlaying,
  isAudioBufferRef,
  percentComplete,
}: Props) => {
  return (
    <>
      <Underline percentComplete={percentComplete} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            width: PLAYER_WIDTH,
            flexDirection: "row",
          }}
        >
          <View style={{ justifyContent: "space-around", flex: 1 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              Essence
            </Text>
            <Text style={{ fontSize: 15 }}>Jason Shaw</Text>
          </View>
          <TouchableOpacity
            onPress={handlePlayPause}
            disabled={!isAudioBufferRef || isLoading}
            style={{ justifyContent: "center" }}
          >
            <Text style={{ fontSize: 20 }}>
              {isLoading ? "Loading..." : isPlaying ? "Stop" : "Play"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
