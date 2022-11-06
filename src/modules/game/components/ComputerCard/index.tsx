import { useEffect, useState } from "react";
import {
  canComputerRememberWord,
  COUNTDOWN_TIME,
  getRandomWord,
  getUsedWordResult,
  randomResponseTime,
} from "../../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndGame,
  setLastWord,
  resetGame,
} from "../../store/slices/gameSlice";
import { State } from "../../store/slices/types";
import data from "../../../../lib/names.json";
import { Button } from "../../../../components";
import { useSpeechRecognition } from "../../../speech-recognition/hooks/useSpeechRecognition";
import { Modal } from "../../../../components/Modal";

type ComputerCardProps = {
  restartCountDown: () => void;
  stopCountDown: () => void;
  clearCountDown: () => void;
};

export const ComputerCard: React.FC<ComputerCardProps> = ({
  restartCountDown,
  stopCountDown,
  clearCountDown,
}) => {
  const lastWord = useSelector((state: State) => state.game.lastWord);
  const usedWords = useSelector((state: State) => state.game.usedWords);
  const winnerHumanMessage = useSelector(
    (state: State) => state.game.winnerHumanMessage,
  );
  const usedWordResult = useSelector(
    (state: State) => state.game.usedWordResult,
  );
  const dispatch = useDispatch();

  const recognizer = useSpeechRecognition();

  const [toast, setToast] = useState(false);

  const getAnswer = (answer: string) => {
    const lastLetter = answer[answer.length - 1];
    const filteredValidWords = data.filter(
      (word: string) => word[0] === lastLetter,
    );
    const randomWord = getRandomWord(filteredValidWords);

    if (!usedWords.includes(randomWord)) {
      recognizer.speak(randomWord).finally(() => {
        dispatch(setLastWord(randomWord));
        restartCountDown();
      });
      return;
    } else {
      dispatch(
        setEndGame({
          isGameFinished: true,
          winnerHumanMessage: "Computer gives the used word and you win!",
          usedWordResult: getUsedWordResult([...usedWords, randomWord]),
        }),
      );
    }
  };

  const computerAnswer = (answer: string) => {
    const randomTime = randomResponseTime();
    recognizer.stopListening();

    if (!canComputerRememberWord()) {
      setTimeout(() => {
        dispatch(
          setEndGame({
            isGameFinished: true,
            winnerHumanMessage: "Computer can't remember the word! You win!",
            usedWordResult: getUsedWordResult(usedWords),
          }),
        );

        stopCountDown();
      }, COUNTDOWN_TIME * 1000);
      return;
    }

    if (answer.endsWith("ğ")) {
      dispatch(
        setEndGame({
          isGameFinished: true,
          winnerHumanMessage:
            "Computer said a word with ending 'ğ' and you win!",
          usedWordResult: getUsedWordResult([...usedWords, answer]),
        }),
      );
      return;
    }

    setTimeout(() => {
      getAnswer(answer);
    }, randomTime);
  };

  const startGameForComputer = () => {
    const randomWord = getRandomWord(data);
    const randomTime = randomResponseTime();

    setTimeout(() => {
      recognizer.speak(randomWord).finally(() => {
        dispatch(setLastWord(randomWord));
        restartCountDown();
      });
    }, randomTime);
  };

  useEffect(() => {
    if (!lastWord) {
      startGameForComputer();
      return;
    }

    computerAnswer(lastWord);
  }, [lastWord]);

  useEffect(() => {
    if (!winnerHumanMessage) {
      return;
    }

    setToast(true);
  }, [winnerHumanMessage]);

  const onClose = () => {
    setToast(false);
    dispatch(resetGame());
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        Computer{"'"}s turn to play! Please wait...
      </h1>
      <Modal.Base show={toast} onClose={onClose}>
        <Modal.Header showClose onClose={onClose}>
          <h1 className="text-2xl font-bold text-center p-5">
            {winnerHumanMessage}
          </h1>
        </Modal.Header>
        <Modal.Content>
          <div className="flex flex-col items-center justify-center">
            {usedWordResult && (
              <p className="text-center mb-5">
                {usedWords.length} words were used in total
              </p>
            )}
            <Button
              onClick={() => {
                clearCountDown();
                dispatch(resetGame());
              }}
            >
              Play again
            </Button>
          </div>
        </Modal.Content>
      </Modal.Base>
    </>
  );
};
