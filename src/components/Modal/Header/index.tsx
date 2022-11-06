import React, { HTMLAttributes } from "react";
import { Button, CloseIcon } from "../..";

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  showClose?: boolean;
  onClose?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  showClose,
  onClose,
  ...rest
}) => {
  return (
    <>
      <div
        className={`w-full flex items-center justify-center relative font-maison-neue-medium text-gray-900 ${
          showClose
            ? "justify-start p-5 lg:px-6 lg:py-5 text-2xl leading-6"
            : "justify-center p-5 pt-6 text-2xl lg:text-32-px lg:leading-10"
        }`}
        {...rest}
      >
        {children}
        {showClose && (
          <Button
            className="absolute top-5 right-5 outline-none bg-transparent"
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
        )}
      </div>
    </>
  );
};
