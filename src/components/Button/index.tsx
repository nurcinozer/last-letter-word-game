import { useMemo } from "react";

export type ButtonVariant = "primary" | "secondary";

export type ButtonSize = "large" | "small";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "small",
  variant = "primary",
  onClick,
  className,
}) => {
  const style = useMemo(() => {
    const base =
      "inline-flex items-center border-0 focus:outline-none mt-4 md:mt-0 text-base";
    const sizeClass =
      size === "large" ? "text-lg py-2 px-8" : "text-sm py-2 px-3";
    const variantClass =
      variant === "primary"
        ? "text-white rounded bg-indigo-500 hover:bg-indigo-600s"
        : variant === "secondary"
        ? "rounded dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400 text-gray-600 bg-gray-100 hover:bg-gray-200 text-gray-600"
        : "text-white bg-indigo-500 hover:bg-indigo-600s";

    return `${base} ${sizeClass} ${variantClass}`;
  }, [size, variant]);

  return (
    <button onClick={onClick} className={`${style} ${className}`}>
      {children}
    </button>
  );
};
