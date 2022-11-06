const COMPUTER_REMEMBER_PROBABILITY = 0.3;
export const COUNTDOWN_TIME = 8;

export const getSpeechRecognitionPermission = async (): Promise<boolean> => {
  const permission = await window.navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  return !!permission;
};

export const getUsedWordResult = (usedWords: string[]): string => {
  return usedWords.join(", ");
};

export const canComputerRememberWord = (): boolean => {
  return Math.random() < COMPUTER_REMEMBER_PROBABILITY;
};

export const randomResponseTime = () => {
  return (Math.floor(Math.random() * 7) + 1) * 1000;
};

export const getRandomWord = (words: string[]): string => {
  return words[Math.floor(Math.random() * words.length)];
};

export const isAnswerValid = (
  previousWord: string,
  currentWord: string,
): boolean => {
  const previousWordLastChar = previousWord[previousWord.length - 1];
  const currentWordFirstChar = currentWord[0];
  if (previousWordLastChar === currentWordFirstChar) return true;

  return false;
};
