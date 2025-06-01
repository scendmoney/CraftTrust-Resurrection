/**
 * A custom hook for managing the state of a modal, including an optional "memory" feature for keeping track of an ID or other state.
 *
 * @template T - The type of the memory state. This can be any type, and defaults to number.
 *
 * @param {boolean} [initialState=false] - The initial open/closed state of the modal.
 *
 * @returns {ModalStateHook<T>} An object containing:
 *  - isOpen: A boolean indicating the current state of the modal (open or closed).
 *  - modalMemory: The current memory state, or null if the modal has been closed without setting a new memory state.
 *  - openModal: A function that opens the modal, optionally setting a new memory state.
 *  - closeModal: A function that closes the modal and clears the memory state.
 *  - toggleModal: A function that toggles the open/closed state of the modal, optionally setting a new memory state when it's opened.
 *
 * @example
 * const { isOpen, modalMemory, openModal, closeModal, toggleModal } = useModalState<number>();
 *
 * @version 1.0.0
 */

import { useCallback, useState } from 'react';

export type TModalStateAction<T = number> = (memory?: T) => void;
export type TModalStateClose = () => void;
export type TModalStateMemory<T = number> = T | null;
export type TModalStateIsOpen = boolean;

interface ModalStateHook<T = number> {
  isOpen: TModalStateIsOpen;
  modalMemory: TModalStateMemory<T>;
  openModal: TModalStateAction<T>;
  closeModal: TModalStateClose;
  toggleModal: TModalStateAction<T>;
}

const useModalState = <T = number>(initialState = false): ModalStateHook<T> => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [modalMemory, setModalMemory] = useState<T | null>(null);

  const openModal = useCallback((id: T | undefined) => {
    if (id !== undefined) {
      setModalMemory(id);
    }

    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalMemory(null);
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(
    (memory?: T) => {
      if (isOpen) {
        setModalMemory(null);
        setIsOpen(false);
      } else {
        if (memory !== undefined) {
          setModalMemory(memory);
        }
        setIsOpen(true);
      }
    },
    [isOpen]
  );

  return { isOpen, modalMemory, openModal, closeModal, toggleModal };
};

export default useModalState;
