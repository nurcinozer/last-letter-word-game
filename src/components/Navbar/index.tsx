import { Button, Logo, RightArrow } from "..";

export const Navbar = () => {
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-2 py-6 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start md:mb-4">
            <Logo />
          </div>
          <div className="lg:flex flex-grow items-center">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <Button
                variant="secondary"
                onClick={() =>
                  window.open("https://github.com/nurcinozer", "_blank")
                }
              >
                @nurcinozer
                <RightArrow />
              </Button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
