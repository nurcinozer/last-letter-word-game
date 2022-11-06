import { Button } from "..";

type HeroProps = {
  startGame: () => void;
  canStartGame: boolean;
  handlePermission: () => void;
};

export const Hero: React.FC<HeroProps> = ({
  startGame,
  canStartGame,
  handlePermission,
}) => {
  return (
    <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
        <img
          className="object-cover object-center rounded"
          alt="hero"
          src="hero.jpg"
        />
      </div>
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
          Welcome to Last Letter Game!
        </h1>
        <p className="mb-8 leading-relaxed">
          In this game, you will be given a Turkish word by computer and you
          have to guess the next Turkish word by using the last letter of the
          previous word. If you can{"'"}t guess the next word in 8 seconds, you
          will lose the game. Good luck!
        </p>
        <p className="mb-8 leading-relaxed">
          Warning: The word should not end with ğ letter!
        </p>
        <div className="flex justify-center">
          <div className="flex justify-center mt-5">
            {canStartGame ? (
              <Button variant="primary" size="large" onClick={startGame}>
                Lets Start
              </Button>
            ) : (
              <div>
                <h2 className="text-white text-lg title-font font-medium mb-3">
                  Please allow microphone access to play the game:
                </h2>
                <Button
                  variant="primary"
                  size="large"
                  onClick={handlePermission}
                >
                  Allow permissions
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
