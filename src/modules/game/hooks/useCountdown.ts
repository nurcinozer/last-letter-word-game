import { useEffect, useRef, useState } from "react";
import { COUNTDOWN_TIME } from "../../../utils/helpers";

interface CountDownProps {
  countDown: number;
  startCountDown: () => void;
  stopCountDown: () => void;
  clearCountDown: () => void;
  restartCountDown: () => void;
}

export const useCountdown = (): CountDownProps => {
  const [countDown, setCountDown] = useState<number>(COUNTDOWN_TIME);
  const intervalRef = useRef<number>();

  const startCountDown = () => {
    intervalRef.current = window.setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          return COUNTDOWN_TIME;
        }
        return prevCountDown - 1;
      });
    }, 1000);
  };

  const stopCountDown = () => {
    window.clearInterval(intervalRef.current);
  };

  const clearCountDown = () => {
    window.clearInterval(intervalRef.current);
    setCountDown(COUNTDOWN_TIME);
  };

  const restartCountDown = () => {
    window.clearInterval(intervalRef.current);
    setCountDown(COUNTDOWN_TIME);
    startCountDown();
  };

  useEffect(() => {
    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, []);

  return {
    countDown,
    startCountDown,
    stopCountDown,
    clearCountDown,
    restartCountDown,
  };
};
