export type Gamer = "HUMAN" | "COMPUTER";

export type IGameData = {
  lastWord: string;
  usedWords: string[];
  gamer: Gamer;
  isGameStarted: boolean;
  isGameFinished: boolean;
  winnerHumanMessage?: string;
  losingHumanMessage?: string;
  errorMessage?: string;
  usedWordResult?: string;
};

export type StartGamePayload = {
  isGameStarted: boolean;
  errorMessage?: string;
};

export type EndGamePayload = {
  isGameFinished: boolean;
  usedWordResult?: string;
  winnerHumanMessage?: string;
  losingHumanMessage?: string;
};

export type State = {
  game: IGameData;
};
