const sleep = (ms: number) => {
  return new Promise<void>((res) => {
    window.setTimeout(() => {
      res();
    }, ms);
  });
};

const transitionDurationPredicates: Array<(duration: number) => boolean> = [
  (duration) => !isNaN(duration),
  (duration) => duration > 0,
];

type TransitionOption = {
  timeoutMS?: number;
  signal?: AbortSignal;
};

export const waitForTransition = (
  el: HTMLElement,
  option?: TransitionOption
): Promise<unknown> => {
  const { timeoutMS, signal } = option ?? {};
  const computedStyle = window.getComputedStyle(el);
  const rawTransitionDuration = computedStyle.transitionDuration;
  const parsedTransitionDuration = parseFloat(rawTransitionDuration);

  const hasTransition = transitionDurationPredicates.every((predicate) =>
    predicate(parsedTransitionDuration)
  );

  if (!hasTransition) {
    return Promise.resolve();
  }

  const transitionend = new Promise<void>((res) => {
    el.addEventListener("transitionend", () => res(), { once: true, signal });
  });

  if (timeoutMS === undefined) {
    return transitionend;
  }

  return Promise.race([transitionend, sleep(timeoutMS)]);
};

export const waitForNextAnimationFrame = () => {
  return new Promise<void>((res) => {
    window.requestAnimationFrame(() => res());
  });
};

export const setHeight = (el: HTMLElement | null, height: string) => {
  if (!el) {
    return;
  }

  el.style.height = height;
};
