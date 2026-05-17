"use client";

import { useEffect, useRef } from "react";

type UseClickOutsideProps<T extends HTMLElement> = {
  onClose: () => void;
  ignoreRef?: React.RefObject<HTMLElement | null>; // optional trigger button ref
};

export function useClickOutside<T extends HTMLElement>({
  onClose,
  ignoreRef,
}: UseClickOutsideProps<T>) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        ref.current &&
        !ref.current.contains(target) &&
        !ignoreRef?.current?.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose, ignoreRef]);

  return ref;
}