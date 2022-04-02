import { useRef, useState, useCallback } from "react";

import {
  setHeight,
  setHeightTransition,
  waitForNextAnimationFrame,
} from "./util";

export const useAccordion = <T extends HTMLElement>(
  initialState: boolean = false
) => {
  const containerRef = useRef<T>(null);
  const [isOpen, setIsOpen] = useState(initialState);
  const busy = useRef(false);

  const open = useCallback(async () => {
    if (isOpen || busy.current || containerRef.current === null) {
      return;
    }
    busy.current = true;
    await setHeightTransition(
      containerRef.current,
      `${containerRef.current.scrollHeight}px`
    );
    setHeight(containerRef.current, "auto");
    setIsOpen(true);
    busy.current = false;
  }, [isOpen]);

  const close = useCallback(async () => {
    if (!isOpen || busy.current || containerRef.current === null) {
      return;
    }
    busy.current = true;
    setHeight(containerRef.current, `${containerRef.current.scrollHeight}px`);
    await waitForNextAnimationFrame();
    await setHeightTransition(containerRef.current, "0");
    setIsOpen(false);
    busy.current = false;
  }, [isOpen]);

  const toggle = useCallback(async () => {
    isOpen ? await close() : await open();
  }, [isOpen]);

  return { containerRef, isOpen, open, close, toggle };
};
