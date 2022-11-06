import { useEffect } from "react";
import { CountdownIcon } from "../../../../components";
import { getUsedWordResult } from "../../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setEndGame } from "../../store/slices/gameSlice";
import { State } from "../../store/slices/types";

// bir kullanıcının bir sonraki kelimeyi söyleyene kadar ne kadar beklemesi gerekiyor ona gore belirlenebilir.

type CountdownProps = {
  countDown: number;
  usedWords: string[];
};

export const Countdown: React.FC<CountdownProps> = ({
  countDown,
  usedWords,
}) => {
  const gamer = useSelector((state: State) => state.game.gamer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (countDown === 0) {
      dispatch(
        setEndGame({
          isGameFinished: true,
          usedWordResult: getUsedWordResult(usedWords),
          losingHumanMessage:
            gamer === "HUMAN"
              ? "You didn't answer in time!"
              : "Computer didn't answer in time and you win!",
          winnerHumanMessage:
            gamer === "HUMAN"
              ? "You lost!"
              : "Computer didn't answer in time and you win!",
        }),
      );
    }
  }, [countDown]);

  return (
    <div className="md:w-1/4 sm:w-1/2 w-full mx-auto py-6">
      <CountdownIcon />
      <h2 className="title-font font-medium text-3xl text-white">
        {countDown}
      </h2>
      <p className="leading-relaxed">Time left to answer</p>
    </div>
  );
};
