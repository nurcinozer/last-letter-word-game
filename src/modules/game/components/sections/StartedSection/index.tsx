import { Card, Tag } from "../../../../../components";
import { ComputerCard } from "../../ComputerCard";
import { Countdown } from "../../Countdown";
import { HumanCard } from "../../HumanCard";
import { useSelector } from "react-redux";
import { State } from "../../../store/slices/types";
import { useEffect } from "react";

type StartedSectionProps = {
  restartCountDown: () => void;
  stopCountDown: () => void;
  clearCountDown: () => void;
  countDown: number;
};

export const StartedSection: React.FC<StartedSectionProps> = ({
  restartCountDown,
  stopCountDown,
  clearCountDown,
  countDown,
}) => {
  const usedWords = useSelector((state: State) => state.game.usedWords);
  const gamer = useSelector((state: State) => state.game.gamer);
  const lastWord = useSelector((state: State) => state.game.lastWord);

  useEffect(() => {
    if (countDown === 0) {
      stopCountDown();
    }
  });

  return (
    <>
      <Card>
        {gamer === "COMPUTER" ? (
          <ComputerCard
            restartCountDown={restartCountDown}
            stopCountDown={stopCountDown}
            clearCountDown={clearCountDown}
          />
        ) : (
          <HumanCard
            restartCountDown={restartCountDown}
            stopCountDown={stopCountDown}
            clearCountDown={clearCountDown}
          />
        )}
      </Card>
      {lastWord && (
        <div className="flex flex-col items-center my-5">
          <h2 className="text-white text-lg title-font font-medium mb-4">
            Used words:
          </h2>
          <div className="flex flex-wrap -m-2">
            <div className="h-full p-3 rounded-lg border-2 border-indigo-500 flex relative flex-wrap max-w-sm">
              {usedWords.map((word, index) => (
                <Tag key={index}>{word}</Tag>
              ))}
            </div>
          </div>
        </div>
      )}
      <Countdown countDown={countDown} usedWords={usedWords} />
    </>
  );
};
