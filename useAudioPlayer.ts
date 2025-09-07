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

  const draw = () => {
    if (!analyserRef.current) {
      return;
    }

    const frequencyArrayLength = analyserRef.current.frequencyBinCount;
    const freqsArray = new Uint8Array(frequencyArrayLength);
    analyserRef.current.getByteFrequencyData(freqsArray);

    setFreqs(freqsArray);

    requestAnimationFrame(draw);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      bufferSourceRef.current?.stop();
      pausedTimeRef.current = 0;
      startTimeRef.current = 0;
    } else {
      if (!audioContextRef.current || !analyserRef.current) {
        return;
      }

      bufferSourceRef.current = audioContextRef.current.createBufferSource();
      bufferSourceRef.current.buffer = audioBufferRef.current;
      bufferSourceRef.current.connect(analyserRef.current);

      startTimeRef.current = audioContextRef.current.currentTime;
      bufferSourceRef.current.start();

      requestAnimationFrame(draw);
    }

    setIsPlaying((prev) => !prev);
  };

  const getCurrentPlaybackTime = () => {
    if (!audioContextRef.current) return 0;

    if (isPlaying) {
      return (
        pausedTimeRef.current +
        (audioContextRef.current.currentTime - startTimeRef.current)
      );
    } else {
      return pausedTimeRef.current;
    }
  };

  const percentComplete =
    getCurrentPlaybackTime() / (audioBufferRef.current?.duration ?? 1);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = FFT_SIZE;
      analyserRef.current.smoothingTimeConstant = 0.8;

      analyserRef.current.connect(audioContextRef.current.destination);
    }

    const fetchBuffer = async () => {
      setIsLoading(true);

      audioBufferRef.current = await fetch(audioUrl)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) =>
          audioContextRef.current!.decodeAudioData(arrayBuffer)
        );

      setIsLoading(false);
    };

    fetchBuffer();

    return () => {
      audioContextRef.current?.close();
    };
  }, [audioUrl]);

  return {
    isPlaying,
    isLoading,
    freqs,
    handlePlayPause,
    percentComplete,
    audioBuffer: audioBufferRef.current,
  };
};
