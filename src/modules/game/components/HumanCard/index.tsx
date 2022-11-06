import { useEffect, useState } from "react";
import { getUsedWordResult, isAnswerValid } from "../../../../utils/helpers";
import data from "../../../../lib/names.json";
import { Button } from "../../../../components";
import { Modal } from "../../../../components/Modal";
import { useSpeechRecognition } from "../../../speech-recognition/hooks/useSpeechRecognition";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndGame,
  setLastWord,
  resetGame,
} from "../../store/slices/gameSlice";
import { State } from "../../store/slices/types";

type HumanCardProps = {
  restartCountDown: () => void;
  stopCountDown: () => void;
  clearCountDown: () => void;
};

export const HumanCard: React.FC<HumanCardProps> = ({
  restartCountDown,
  stopCountDown,
  clearCountDown,
}) => {
  const lastWord = useSelector((state: State) => state.game.lastWord);
  const usedWords = useSelector((state: State) => state.game.usedWords);
  const losingHumanMessage = useSelector(
    (state: State) => state.game.losingHumanMessage,
  );
  const usedWordResult = useSelector(
    (state: State) => state.game.usedWordResult,
  );
  const dispatch = useDispatch();

  const recognizer = useSpeechRecognition();

  const [toast, setToast] = useState<boolean>(
    (losingHumanMessage && true) || false,
  );

  useEffect(() => {
    recognizer.onResult(
      (event: { readonly results: SpeechRecognitionResultList }) => {
        const { transcript }: { transcript: string } = event.results[0][0];
        const answer = transcript.toLowerCase().replace("i̇", "i"); // fix for turkish i

        if (lastWord && !isAnswerValid(lastWord, answer)) {
          stopCountDown();
          dispatch(
            setEndGame({
              isGameFinished: true,
              losingHumanMessage:
                "The word is not starting with the last letter!",
              usedWordResult: getUsedWordResult([...usedWords, answer]),
            }),
          );
          return;
        }

        if (answer.includes(" ")) {
          stopCountDown();
          dispatch(
            setEndGame({
              isGameFinished: true,
              losingHumanMessage: "You gave more than one word!",
              usedWordResult: getUsedWordResult([...usedWords, answer]),
            }),
          );
          return;
        }

        if (answer.endsWith("ğ")) {
          stopCountDown();
          dispatch(
            setEndGame({
              isGameFinished: true,
              losingHumanMessage: "You gave a word ending with 'ğ'!",
              usedWordResult: getUsedWordResult([...usedWords, answer]),
            }),
          );
          return;
        }

        if (usedWords.includes(answer)) {
          stopCountDown();
          dispatch(
            setEndGame({
              isGameFinished: true,
              losingHumanMessage: "You can't use the same word!",
              usedWordResult: getUsedWordResult([...usedWords, answer]),
            }),
          );

          return;
        }

        if (data.includes(answer)) {
          dispatch(setLastWord(answer));
          restartCountDown();
          return;
        }

        stopCountDown();
        dispatch(
          setEndGame({
            isGameFinished: true,
            losingHumanMessage: "The word is not in the dictionary!",
            usedWordResult: getUsedWordResult([...usedWords, answer]),
          }),
        );
      },
    );
    recognizer.startListening();
  }, []);

  useEffect(() => {
    if (!losingHumanMessage) {
      return;
    }

    setToast(true);
  }, [losingHumanMessage]);

  const onClose = () => {
    setToast(false);
    dispatch(resetGame());
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Your turn</h1>
      <Modal.Base show={toast} onClose={onClose}>
        <Modal.Header showClose onClose={onClose}>
          <h1 className="text-2xl font-bold text-center p-5">
            {losingHumanMessage || ""}
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
