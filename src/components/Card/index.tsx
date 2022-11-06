export const Card: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="p-4 lg:w-1/2 md:w-full mx-auto">
      <div className="flex border-2 rounded-lg border-gray-800 p-8 sm:flex-row flex-col">
        {children}
      </div>
    </div>
  );
};
