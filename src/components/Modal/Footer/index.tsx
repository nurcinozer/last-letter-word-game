import React, { HTMLAttributes } from "react";

export const Footer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  return (
    <div className="w-full" {...rest}>
      {children}
    </div>
  );
};
