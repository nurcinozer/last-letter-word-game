/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

interface ISpeechEvent {
  readonly results: SpeechRecognitionResultList;
}

interface IRecognition {
  continuous: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  on: () => void;
  onresult: (result: any) => void;
}

const { webkitSpeechRecognition: WebkitSpeechRecognition }: IWindow =
  window as unknown as IWindow;

class SpeechRecognition {
  recognition: IRecognition | any;
  synth: SpeechSynthesis | any;
  isSupported: boolean;

  constructor() {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition ||
        (window as any).mozSpeechRecognition ||
        (window as any).msSpeechRecognition ||
        (window as any).oSpeechRecognition);

    const browserSupportsSpeechRecognition = !!SpeechRecognition;
    const browserSupportsMedia =
      typeof window !== "undefined" &&
      window.navigator !== undefined &&
      window.navigator.mediaDevices !== undefined &&
      window.navigator.mediaDevices.getUserMedia !== undefined &&
      (window.AudioContext !== undefined ||
        (window as any).webkitAudioContext !== undefined);

    this.isSupported = browserSupportsSpeechRecognition && browserSupportsMedia;

    if (this.isSupported) {
      this.recognition = new WebkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.lang = "tr-TR";
      this.synth = window.speechSynthesis;
    }
  }
}

export const useSpeechRecognition = () => {
  const [state, setState] = useState<{
    isListening?: boolean;
    isSupported?: boolean;
  }>({
    isListening: false,
    isSupported: false,
  });

  const speech = new SpeechRecognition();

  const startListening = () => {
    setState({ isListening: true });
    speech.recognition.start();
  };

  const stopListening = () => {
    setState({ isListening: false });
    speech.recognition.stop();
  };

  const onResult = (callback: (data: ISpeechEvent) => void) => {
    speech.recognition.onresult = (result: ISpeechEvent) => callback(result);
  };

  const speak = (word: string) => {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.addEventListener("end", () => {
        resolve(word);
      });
      speech.synth?.speak(utterance);
    });
  };

  const isSupported = speech.isSupported;

  return {
    state,
    startListening,
    stopListening,
    onResult,
    speak,
    isSupported,
  };
};
