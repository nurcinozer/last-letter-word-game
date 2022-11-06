import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EndGamePayload, Gamer, IGameData, StartGamePayload } from "./types";

const initialState: IGameData = {
  lastWord: "",
  usedWords: [], // sonuncu kullanılan used word = last word.
  gamer: "COMPUTER",
  isGameStarted: false, // enum ile tanımlanabilir
  isGameFinished: false,
  winnerHumanMessage: "",
  losingHumanMessage: "",
  errorMessage: "",
  usedWordResult: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStartGame: (
      state: IGameData,
      action: PayloadAction<StartGamePayload>,
    ) => {
      return {
        ...state,
        isGameStarted: action.payload.isGameStarted,
        errorMessage: action.payload.errorMessage,
      };
    },
    setEndGame: (state: IGameData, action: PayloadAction<EndGamePayload>) => {
      return {
        ...state,
        isGameFinished: action.payload.isGameFinished,
        usedWordResult: action.payload.usedWordResult,
        winnerHumanMessage: action.payload.winnerHumanMessage,
        losingHumanMessage: action.payload.losingHumanMessage,
      };
    },
    setLastWord: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        lastWord: action.payload,
        usedWords: [...state.usedWords, action.payload],
        gamer: state.gamer === "HUMAN" ? "COMPUTER" : "HUMAN",
      };
    },
    // birisi "şunu" söylüyor şeklinde bir action oluşturulabilir.
    // oyun odaklı (domain) actionları yazılabilir.
    setGamer: (state: IGameData, action: PayloadAction<Gamer>) => {
      state.gamer = action.payload;
    },
    resetGame: () => {
      return { ...initialState };
    },
  },
});

export const { setStartGame, setEndGame, setLastWord, setGamer, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
