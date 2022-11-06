import { useEffect, useMemo, useState } from "react";
import { Hero } from "../../../../../components";
import { getSpeechRecognitionPermission } from "../../../../../utils/helpers";
import { useCountdown } from "../../../hooks/useCountdown";
import { useDispatch, useSelector } from "react-redux";
import { setStartGame } from "../../../store/slices/gameSlice";
import { State } from "../../../store/slices/types";
import { StartedSection } from "../StartedSection";
import { useSpeechRecognition } from "../../../../speech-recognition/hooks/useSpeechRecognition";
import { Modal } from "../../../../../components/Modal";

export const DefaultSection = () => {
  const isGameStarted = useSelector((state: State) => state.game.isGameStarted);
  const errorMessage = useSelector((state: State) => state.game.errorMessage);

  const dispatch = useDispatch();

  const {
    countDown,
    startCountDown,
    restartCountDown,
    clearCountDown,
    stopCountDown,
  } = useCountdown();

  const [canStartGame, setCanStartGame] = useState(false);

  const [toast, setToast] = useState(false);

  const recognizer = useSpeechRecognition();

  const handlePermission = async () => {
    if (!recognizer.isSupported) {
      dispatch(
        setStartGame({
          isGameStarted: false,
          errorMessage: "Your browser does not support speech recognition.", // string yerine error kodu göndermen daha iyi
        }),
      );
      setToast(true); // tek bir renderda çalışacaklar
      return;
    }

    const permission = await getSpeechRecognitionPermission();
    if (permission) {
      setCanStartGame(true);
    } else {
      dispatch(
        setStartGame({
          isGameStarted: false,
          errorMessage: "You need to allow speech recognition.",
        }),
      );
    }

    // getSpeechRecognitionPermission()
    //   .then(() => {
    //     setCanStartGame(true);
    //   })
    //   .catch(() => {
    //     dispatch(
    //       setStartGame({
    //         isGameStarted: false,
    //         errorMessage: "You have to allow speech recognition permission.",
    //       }),
    //     );
    //   });
  };

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    setToast(true);
  }, [errorMessage]);

  const startGame = () => {
    startCountDown();
    dispatch(setStartGame({ isGameStarted: true }));
  };

  const innerComponent = useMemo(() => {
    if (isGameStarted) {
      return (
        <StartedSection
          restartCountDown={restartCountDown}
          stopCountDown={stopCountDown}
          clearCountDown={clearCountDown}
          countDown={countDown}
        />
      );
    }

    return (
      <>
        <Hero
          canStartGame={canStartGame}
          handlePermission={handlePermission}
          startGame={startGame}
        />
      </>
    );
  }, [isGameStarted, canStartGame, countDown, handlePermission]);

  const onClose = () => {
    setToast(false);
  };

  return (
    <div className="px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        {innerComponent}
      </div>
      <Modal.Base show={toast} onClose={onClose}>
        <Modal.Header showClose onClose={onClose}>
          <h1 className="text-2xl font-bold text-center p-5">{errorMessage}</h1>
        </Modal.Header>
      </Modal.Base>
    </div>
  );
};
