import {
  type RefObject,
  type Dispatch,
  useRef,
  useReducer,
  useEffect,
} from "react";

import {
  setHeight,
  waitForTransition,
  waitForNextAnimationFrame,
} from "./util";
import { State, defaultInitialState, reducer, OpenAction } from "./state";

export const useAccordion = <T extends HTMLElement>(
  initialState: State = defaultInitialState
): [RefObject<T>, Dispatch<OpenAction>, State] => {
  const mountedRef = useRef(false);
  const containerRef = useRef<T>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    if (!containerRef.current) {
      return;
    }

    containerRef.current.setAttribute(
      "aria-hidden",
      state.isOpen ? "false" : "true"
    );

    if (state.isOpen) {
      const transition = waitForTransition(containerRef.current);
      dispatch({ type: "START_ANIMATION" });
      setHeight(containerRef.current, `${containerRef.current.scrollHeight}px`);
      transition.then(() => {
        dispatch({ type: "END_ANIMATION" });
        waitForNextAnimationFrame().then(() => {
          setHeight(containerRef.current, "auto");
        });
      });
    } else {
      setHeight(containerRef.current, `${containerRef.current.scrollHeight}px`);
      waitForNextAnimationFrame().then(() => {
        if (!containerRef.current) {
          return;
        }
        const transition = waitForTransition(containerRef.current);
        dispatch({ type: "START_ANIMATION" });
        setHeight(containerRef.current, "0");
        transition.then(() => {
          dispatch({ type: "END_ANIMATION" });
        });
      });
    }
  }, [state.isOpen]);

  return [containerRef, dispatch, state];
};
