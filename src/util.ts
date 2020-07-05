const sleep = (ms: number) => {
  return new Promise((res) => {
    window.setTimeout(() => {
      res();
    }, ms);
  });
};

const transitionDurationPredicates: Array<(duration: number) => boolean> = [
  (duration) => !isNaN(duration),
  (duration) => duration > 0,
];

export const waitForTransition = (
  el: HTMLElement,
  timeoutMS?: number
): Promise<unknown> => {
  const computedStyle = window.getComputedStyle(el);
  const rawTransitionDuration = computedStyle.transitionDuration;
  const parsedTransitionDuration = parseFloat(rawTransitionDuration);

  const hasTransition = transitionDurationPredicates.every((predicate) =>
    predicate(parsedTransitionDuration)
  );

  if (!hasTransition) {
    return Promise.resolve();
  }

  const transitionend = new Promise((res) => {
    el.addEventListener("transitionend", () => res(), { once: true });
  });

  if (timeoutMS === undefined) {
    return transitionend;
  }

  return Promise.race([transitionend, sleep(timeoutMS)]);
};

export const waitForNextAnimationFrame = () => {
  return new Promise((res) => {
    window.requestAnimationFrame(() => res());
  });
};

export const setHeight = (el: HTMLElement | null, height: string) => {
  if (!el) {
    return;
  }

  el.style.height = height;
};
