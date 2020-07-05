export type State = {
  isOpen: boolean;
  isAnimating: boolean;
};

export const defaultInitialState: State = {
  isOpen: false,
  isAnimating: false,
};

type AnimationAction =
  | {
      type: "START_ANIMATION";
    }
  | {
      type: "END_ANIMATION";
    };

export type OpenAction =
  | {
      type: "OPEN";
    }
  | {
      type: "CLOSE";
    }
  | {
      type: "TOGGLE";
    };

type Action = AnimationAction | OpenAction;

const animationCaseReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "START_ANIMATION": {
      return { ...state, isAnimating: true };
    }

    case "END_ANIMATION": {
      return { ...state, isAnimating: false };
    }
  }

  return state;
};

const openCaseReducer: React.Reducer<State, Action> = (state, action) => {
  if (state.isAnimating) {
    return state;
  }

  switch (action.type) {
    case "OPEN": {
      return { ...state, isOpen: true };
    }

    case "CLOSE": {
      return { ...state, isOpen: false };
    }

    case "TOGGLE": {
      return { ...state, isOpen: !state.isOpen };
    }
  }

  return state;
};

export const reducer: React.Reducer<State, Action> = (state, action) => {
  const reducers = [openCaseReducer, animationCaseReducer];

  return reducers.reduce(
    (prevState, reducer) => reducer(prevState, action),
    state
  );
};
