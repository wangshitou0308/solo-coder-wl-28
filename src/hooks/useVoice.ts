import { useState, useCallback, useEffect, useRef } from "react";
import { useAppStore, type VoiceSpeed } from "@/store/appStore";

const speedMap: Record<VoiceSpeed, number> = {
  slow: 0.7,
  normal: 0.95,
  fast: 1.2,
};

export function useVoice() {
  const { voiceEnabled, voiceSpeed, voiceRepeat } = useAppStore();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const segmentsRef = useRef<string[]>([]);
  const segmentIndexRef = useRef(0);
  const repeatRef = useRef(voiceRepeat);

  useEffect(() => {
    repeatRef.current = voiceRepeat;
  }, [voiceRepeat]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setCurrentSegment(null);
    segmentIndexRef.current = 0;
  }, []);

  const speakSingle = useCallback(
    (text: string) => {
      if (!voiceEnabled || !window.speechSynthesis) return;

      stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = speedMap[voiceSpeed];
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (voiceRepeat && repeatRef.current) {
          setTimeout(() => speakSingle(text), 500);
        }
      };
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [voiceEnabled, voiceSpeed, voiceRepeat, stop]
  );

  const speakSegments = useCallback(
    (segments: string[]) => {
      if (!voiceEnabled || !window.speechSynthesis || segments.length === 0) return;

      stop();
      segmentsRef.current = segments;
      segmentIndexRef.current = 0;

      const playNext = () => {
        if (segmentIndexRef.current >= segmentsRef.current.length) {
          if (voiceRepeat && repeatRef.current) {
            segmentIndexRef.current = 0;
            setTimeout(playNext, 1000);
          } else {
            setIsSpeaking(false);
            setCurrentSegment(null);
          }
          return;
        }

        setCurrentSegment(segmentIndexRef.current);
        const text = segmentsRef.current[segmentIndexRef.current];
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "zh-CN";
        utterance.rate = speedMap[voiceSpeed];
        utterance.pitch = 1;
        utterance.onend = () => {
          segmentIndexRef.current++;
          setTimeout(playNext, 300);
        };
        utterance.onerror = () => {
          segmentIndexRef.current++;
          setTimeout(playNext, 300);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      };

      setIsSpeaking(true);
      playNext();
    },
    [voiceEnabled, voiceSpeed, voiceRepeat, stop]
  );

  const toggleRepeat = useCallback(() => {
    repeatRef.current = !repeatRef.current;
    return repeatRef.current;
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return {
    isSpeaking,
    currentSegment,
    speak: speakSingle,
    speakSegments,
    stop,
    toggleRepeat,
  };
}
