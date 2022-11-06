import { Dialog, Transition } from "@headlessui/react";
import { Fragment, memo } from "react";

type ModalBaseProps = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
};

const _ModalBase: React.FC<ModalBaseProps> = ({
  show = false,
  onClose = () => null,
  children,
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="z-20 fixed inset bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto z-20">
          <div className="flex h-full items-center justify-center text-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel as={Fragment}>
                <div className="w-modal max-w-full transform overflow-hidden bg-white text-left shadow-xl transition-all flex flex-col lg:w-modal lg:h-auto">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ModalBase = memo(_ModalBase, (prevProps, nextProps) => {
  return prevProps.show === nextProps.show;
});
