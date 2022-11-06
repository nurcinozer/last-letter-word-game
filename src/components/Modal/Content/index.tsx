import { HTMLAttributes } from "react";

export const Content: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <div
      className="flex-1 overflow-y-auto w-full no-scrollbar font-medium text-gray-900 p-4"
      {...rest}
    >
      {children}
    </div>
  );
};
