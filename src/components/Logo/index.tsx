import { SwordIcon } from "../Icons";

export const Logo = () => {
  return (
    <>
      <div className="flex flex-row justify-center title-font font-medium items-center text-white mb-4 md:mb-0">
        <div className="w-10 h-10 text-white flex justify-center items-center bg-indigo-500 rounded-full">
          <SwordIcon />
        </div>
        <span className="ml-3 text-xl xl:block lg:hidden">
          Last Letter Game
        </span>
      </div>
    </>
  );
};
