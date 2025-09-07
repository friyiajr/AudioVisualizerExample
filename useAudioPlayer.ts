import { useEffect, useRef, useState } from "react";
import {
  AnalyserNode,
  AudioBuffer,
  AudioBufferSourceNode,
  AudioContext,
} from "react-native-audio-api";
import { FFT_SIZE } from "./Constants";

export const useAudioPlayer = (audioUrl: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [freqs, setFreqs] = useState<Uint8Array>(
    new Uint8Array(FFT_SIZE / 2).fill(10)
  );

  const audioContextRef = useRef<AudioContext | null>(null);
  const bufferSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  const draw = () => {};

  const handlePlayPause = () => {};

  const getCurrentPlaybackTime = () => {};

  const percentComplete = 0;

  useEffect(() => {}, [audioUrl]);

  return {
    isPlaying,
    isLoading,
    freqs,
    handlePlayPause,
    percentComplete,
    audioBuffer: audioBufferRef.current,
  };
};
